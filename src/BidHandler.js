import AdUnit from './adunit';
import Adapter from './adapter';
import Auction from './Auction';
import { RequestFactory } from './request';
import { strategies } from './Settings';

export default class BidHandler {
  active: boolean;
  factory: RequestFactory;
  adapters: Set<Adapter>;
  adUnits: AdUnit[];
  callbacks: Object;

  constructor() {
    this.active = false;
    this.factory = new RequestFactory();
    this.adapters = new Set();
    this.adUnits = [];
    this.callbacks = {};
  }

  registerAdUnit(adUnit: AdUnit) {
    this.adUnits.push(adUnit);
  }

  requestAds(timeout: number, strategy: number) {
    if (!this.active) {
      throw new Error('Bid handler is not active');
    }

    const context: BidHandler = this;
    const auction: Auction = new Auction(this.adUnits);

    this.adapters.forEach((adapter) => {
      adapter.request(auction, timeout)
        .then((response) => {
          context.response(adapter, strategy, auction, response);
        })
        .catch(error => console.warn(error));
    });
  }

  addAdapter(adapter: Adapter) {
    this.adapters.add(adapter);
  }

  addCallback(key: String, callback) {
    this.callbacks[key] = callback;
  }

  response(adapter: Adapter, strategy: number, auction: Auction, resp: Object) {
    if (this.completed) return;

    auction.addResponse(adapter.type, resp);

    switch (strategy) {
      case strategies.ON_FIRST_RESPONSE:
        this.complete();
        return;
      case strategies.ON_EVERY_RESPONSE:
        this.deliver();
        return;
      default:
        if (Object.keys(this.result).length === this.adapters.length) {
          this.complete();
        }
    }
  }

  complete(auction: Auction) {
    auction.complete();
    this.deliver(auction);
  }

  deliver(auction: Auction) {
    if (auction.completed) {
      return;
    }

    if (typeof this.callbacks.onAuction !== 'undefined') {
      this.callbacks.onAuction.call(auction, auction);
    }
  }
}

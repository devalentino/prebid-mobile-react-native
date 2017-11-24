import AdUnit from './adunit';
import Adapter from './adapter';
import Auction from './Auction';
import { RequestFactory } from './request';

export default class BidHandler {
  active: boolean;
  factory: RequestFactory;
  adapters: Set<Adapter>;
  adUnits: AdUnit[];

  constructor() {
    this.active = true;
    this.factory = new RequestFactory();
    this.adapters = new Set();
    this.adUnits = [];
  }

  registerAdUnit(adUnit: AdUnit) {
    this.adUnits.push(adUnit);
  }

  requestAds(timeout: number, strategy: number) {
    if (!this.active) {
      throw new Error('Bid handler is not active');
    }

    const adapters: String[] = [];
    this.adapters.forEach(adapter => adapters.push(adapter));

    const auction: Auction = new Auction(this.adUnits, adapters, strategy);
    setTimeout(auction.complete.bind(auction), timeout);

    this.adapters.forEach((adapter) => {
      adapter.request(auction, timeout);
    });
  }

  addAdapter(adapter: Adapter) {
    this.adapters.add(adapter);
  }
}

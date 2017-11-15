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

  requestAds() {
    if (!this.active) {
      throw new Error('Bid handler is not active');
    }

    const auction: Auction = new Auction(this.adUnits);

    this.adapters.forEach((adapter) => {
      adapter.request(auction);
    });
  }

  addAdapter(adapter: Adapter) {
    this.adapters.add(adapter);
  }
}

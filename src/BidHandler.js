import AdUnit from './adunit';
import Adapter from './adapter';
import Request, { Geo, RequestFactory } from './request';

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

    // TODO: run through all the ad units and request bids
  }

  addAdapter(adapter: Adapter) {
    this.adapters.add(adapter);
  }

  addRequestFactory(
    type: String,
    factory: (req: Request, geo?: Geo) => mixed,
  ) {
    this.factory.addCustomHandler(type, factory);
  }
}

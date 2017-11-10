import AdUnit from './adunit';
import Adapter from './adapter';
import BidHandler from './BidHandler';
import Request, { Geo } from './request';

let instance = null;

export default class Prebid {
  bidHandler: BidHandler;
  accountId: String;
  settings: Object;
  requestAdsInterval: number;

  constructor(adUnits: AdUnit[], accountId:String) {
    if (instance) {
      return instance;
    }

    this.bidHandler = new BidHandler();

    this.accountId = accountId;
    this.settings = {
      period: 30 * 1000,
    };

    adUnits.map(adUnit => this.bidHandler.registerAdUnit(adUnit));

    instance = this;
  }

  period(period: number) {
    this.settings.period = period;
    return this;
  }

  start() {
    this.requestAdsInterval = setInterval(
      this.bidHandler.requestAds,
      this.settings.period,
    );
  }

  stop() {
    clearInterval(this.requestAdsInterval);
    this.bidHandler.active = false;
  }

  registerAdapter(
    adapter: Adapter,
    factory?: (req: Request, geo?: Geo) => mixed,
  ) {
    this.bidHandler.addAdapter(adapter);
    this.bidHandler.addRequestFactory(adapter.type, factory);
  }
}

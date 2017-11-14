import AdUnit from './adunit';
import Adapter from './adapter';
import BidHandler from './BidHandler';

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
    this.bidHandler.requestAds();

    this.requestAdsInterval = setInterval(
      this.bidHandler.requestAds.bind(this.bidHandler),
      this.settings.period,
    );
  }

  stop() {
    clearInterval(this.requestAdsInterval);
    this.bidHandler.active = false;
  }

  registerAdapter(adapter: Adapter): Prebid {
    this.bidHandler.addAdapter(adapter);
    return this;
  }
}

import AdUnit from './adunit';
import Adapter from './adapter';
import BidHandler from './BidHandler';
import Settings from './Settings';

let instance = null;

export default class Prebid {
  bidHandler: BidHandler;
  accountId: String;
  conf: Settings;
  requestAdsInterval: number;

  constructor(adUnits: AdUnit[], accountId:String) {
    if (instance) {
      return instance;
    }

    this.bidHandler = new BidHandler(this);

    this.accountId = accountId;
    this.conf = new Settings();

    adUnits.map(adUnit => this.bidHandler.registerAdUnit(adUnit));

    instance = this;
  }

  settings(settings: Settings): Prebid {
    this.conf = settings;
    return this;
  }

  start() {
    this.bidHandler.active = true;
    this.bidHandler.requestAds(this.conf.adRequestTimeout, this.conf.strategy);

    if (this.conf.adRequestPeriod === 0) return;

    this.requestAdsInterval = setInterval(
      this.bidHandler.requestAds.bind(
        this.bidHandler,
        this.conf.adRequestTimeout,
        this.conf.strategy,
      ),
      this.conf.adRequestPeriod,
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

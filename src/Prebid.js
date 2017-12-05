import Adapter from './adapter';
import BidHandler from './BidHandler';
import Settings from './Settings';

export default class Prebid {
  bidHandler: BidHandler;
  conf: Settings;
  requestAdsInterval: number;

  constructor(args?: Object) {
    this.bidHandler = new BidHandler(this);

    if (typeof args === 'undefined') {
      this.conf = new Settings();
      return;
    }

    if (Object.prototype.hasOwnProperty.call(args, 'settings')) {
      this.conf = new Settings(args.settings);
    } else {
      this.conf = new Settings();
    }

    if (Object.prototype.hasOwnProperty.call(args, 'adUnits')) {
      args.adUnits.map(adUnit => this.bidHandler.registerAdUnit(adUnit));
    }

    if (Object.prototype.hasOwnProperty.call(args, 'adapters')) {
      args.adapters.map(adapter => this.registerAdapter(adapter));
    }

    if (Object.prototype.hasOwnProperty.call(args, 'callbacks')) {
      Object.keys(args.callbacks).forEach((key) => {
        this.bidHandler.addCallback(key, args.callbacks[key]);
      });
    }
  }

  settings(settings: Object): Prebid {
    this.conf = new Settings(Object.assign({}, this.conf, settings));
    return this;
  }

  registerAdapter(adapter: Adapter): Prebid {
    this.bidHandler.registerAdapter(adapter);
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
    this.requestAdsInterval = null;
    this.bidHandler.active = false;
  }
}

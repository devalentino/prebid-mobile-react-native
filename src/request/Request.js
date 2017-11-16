import AdUnit from '../adunit';
import App from './App';
import Device from './Device';
import User from './User';
import SDK from './SDK';

export default class Request {
  r: Object;

  constructor() {
    const initAdUnits: AdUnit[] = [];

    this.r = {
      cache_markup: 1,
      sort_bids: 1,
      adUnits: initAdUnits,
    };
  }

  accountId(accountId: String): Request {
    this.r.accountId = accountId;
    return this;
  }

  tid(tid: String): Request {
    this.r.tid = tid;
    return this;
  }

  adUnit(adUnit: AdUnit) {
    this.r.adUnits.push(adUnit);
    return this;
  }

  device(device?: Device): Device {
    if (typeof device !== 'undefined') {
      this.r.device = device;
    } else if (!Object.prototype.hasOwnProperty.call(this.r, 'device')) {
      this.r.device = new Device();
    }
    return this.r.device;
  }

  app(): App {
    if (!Object.prototype.hasOwnProperty.call(this.r, 'app')) {
      this.r.app = new App();
    }
    return this.r.app;
  }

  user(user: User): User {
    if (typeof user !== 'undefined') {
      this.r.user = user;
    } else if (!Object.prototype.hasOwnProperty.call(this.r, 'user')) {
      this.r.user = new User();
    }
    return this.r.user;
  }

  sdk(): SDK {
    if (!Object.prototype.hasOwnProperty.call(this.r, 'sdk')) {
      this.r.sdk = new SDK();
    }
    return this.r.sdk;
  }

  serialize(): Object {
    const serialized = {
      cache_markup: this.r.cache_markup,
      sort_bids: this.r.sort_bids,
      tid: this.r.tid,
      account_id: this.r.accountId,
      ad_units: [],
    };

    const device = this.device().serialize();
    if (Object.keys(device).length) {
      serialized.device = device;
    }

    const app = this.app().serialize();
    if (Object.keys(app).length) {
      serialized.app = app;
    }

    const user = this.user().serialize();
    if (Object.keys(user).length) {
      serialized.user = user;
    }

    const sdk = this.sdk().serialize();
    if (Object.keys(sdk).length) {
      serialized.sdk = sdk;
    }

    this.r.adUnits.map(adUnit => serialized.ad_units.push(adUnit.serialize(
      serialized.device.w,
      serialized.device.h,
    )));

    return serialized;
  }
}

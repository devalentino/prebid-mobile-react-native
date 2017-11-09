import App from './App';
import Device from './Device';
import User from './User';
import SDK from './SDK';

export default class Request {
  r: Object;

  constructor() {
    this.r = {
      cache_markup: 1,
      sort_bids: 1,
    };
  }

  accountId(accountId: String): Request {
    this.r.account_id = accountId;
    return this;
  }

  tid(tid: String): Request {
    this.r.tid = tid;
    return this;
  }

  device(): Device {
    if (!Object.prototype.hasOwnProperty.call(this.r, 'device')) {
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

  user(): User {
    if (!Object.prototype.hasOwnProperty.call(this.r, 'user')) {
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
}

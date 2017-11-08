import App from './request/App';
import Device from './request/Device';

export default class Request {
  r: Object;

  constructor() {
    this.r = {};
  }

  device(): Device {
    if (!Object.prototype.hasOwnProperty.call(this.r, 'device')) {
      this.r.device = new Device();
    }
    return this.r.device;
  }

  app(): App {
    if (!Object.prototype.hasOwnProperty.call(this.r, 'app')) {
      this.r.device = new App();
    }
    return this.r.app;
  }
}

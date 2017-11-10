import Geo from './Geo';
import Request from './Request';

export default class RequestFactory {
  target: Object;
  strategies: {[String]: (Request) => mixed};

  constructor() {
    this.target = null;
    this.strategies = {};
  }

  static collectTarget(): Object {
    const target = {
      user: null,
      device: null,
    };

    // TODO: collect device, user data
    return target;
  }

  addCustomHandler(
    provider: String,
    handler: (request: Request, geo: Geo) => mixed,
  ) {
    this.strategies[provider] = handler;
  }

  baseRequest(): Request {
    const req: Request = new Request();
    if (this.target === null) {
      this.target = this.collectTarget();
    }

    req.device(this.target.device);
    req.user(this.target.user);

    return req;
  }

  request(strategy, geo?: Geo): Request {
    const req = this.baseRequest();
    const handler = this.strategies[strategy];
    if (typeof handler !== 'undefined') {
      return handler.call(this, req, geo);
    }

    if (typeof geo !== 'undefined') {
      req.device().geo(geo);
    }

    return req;
  }
}

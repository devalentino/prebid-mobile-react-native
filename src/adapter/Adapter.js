import AdUnit from '../adunit';
import Request, { Geo } from '../request';
import RequestFactory from '../request/RequestFactory';

export default class Adapter {
  type: String;
  requestFactory: RequestFactory;

  constructor(factory?: (req: Request, geo?: Geo) => mixed) {
    this.requestFactory = new RequestFactory();

    if (typeof factory !== 'undefined') {
      this.requestFactory.addCustomHandler(this.type, factory);
    }
  }

  requestBid(adUnits: AdUnit[]) {
    throw new Error('You should extend Adapter ' +
      'and implement this method in subclass!');
  }
}

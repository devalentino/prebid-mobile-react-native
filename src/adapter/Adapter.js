import Auction from '../Auction';
import Request from '../request';
import RequestFactory from '../request/RequestFactory';

export default class Adapter {
  type: String;
  requestFactory: RequestFactory;

  constructor(type: String, factory?: (req: Request) => mixed) {
    this.type = type;
    this.requestFactory = new RequestFactory();

    if (typeof factory !== 'undefined') {
      this.requestFactory.addCustomHandler(this.type, factory);
    }
  }

  request(auction: Auction) {
    throw new Error('You should extend Adapter ' +
      'and implement this method in subclass!');
  }

  response(response) {
    throw new Error('You should extend Adapter ' +
      'and implement this method in subclass!');
  }
}

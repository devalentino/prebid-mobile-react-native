import Request from '../request';
import Adapter from './Adapter';
import AdUnit from '../adunit';

export default class PrebidServerAdapter extends Adapter {
  constructor(factory?: (req: Request) => mixed) {
    super('PREBID_SERVER_ADAPTER', factory);
  }

  request(adUnits: AdUnit[]) {
    const context = this;
    this.requestFactory.request(this.type)
      .then((req) => {
        context.send(req);
      });
  }

  send(req) {
    console.log(req);
  }
}

import Request from '../request';
import Adapter from './Adapter';
import Auction from '../Auction';

export default class PrebidServerAdapter extends Adapter {
  constructor(factory?: (req: Request) => mixed) {
    super('PREBID_SERVER_ADAPTER', factory);
  }

  request(auction: Auction) {
    const context = this;
    this.requestFactory.request(this.type)
      .then((req) => {
        auction.adUnits.map(adUnit => req.adUnit(adUnit));
        context.send(req);
      });
  }

  send(req: Request) {
    fetch('http://prebid.adnxs.com/pbs/v1/auction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.serialize()),
    })
      .then(response => console.log(response));
  }
}

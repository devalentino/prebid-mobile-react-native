import Request from '../request';
import Adapter from './Adapter';
import Auction from '../Auction';

export default class PrebidServerAdapter extends Adapter {
  buildRequestTimeout: number;

  constructor(
    buildRequestTimeout: number,
    factory?: (req: Request) => mixed,
  ) {
    super('PREBID_SERVER_ADAPTER', factory);
    this.buildRequestTimeout = buildRequestTimeout;
  }

  request(auction: Auction) {
    const context = this;
    this.requestFactory.request(this.type, this.buildRequestTimeout)
      .then((req) => {
        auction.adUnits.map(adUnit => req.adUnit(adUnit));
        context.send(req, resp => context.response.call(this, auction, resp));
      });
  }

  response(auction: Auction, resp: Object) {
    auction.response(this.type, resp);
  }

  send(req: Request, successCallback: (auction: Auction) => mixed) {
    fetch('http://192.168.0.109:8000/auction', {
    // fetch('http://prebid.adnxs.com/pbs/v1/auction', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.serialize()),
    })
      .then(resp => resp.json())
      .then((json) => {
        successCallback(json);
      })
      .catch(error => console.warn('error occured:', error));
  }
}

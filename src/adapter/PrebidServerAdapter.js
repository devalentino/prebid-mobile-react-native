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
    const requestPromise = super.request(this.buildRequestTimeout);
    const context = this;
    requestPromise
      .then((req) => {
        auction.adUnits.map(adUnit => req.adUnit(adUnit));

        fetch('http://prebid.adnxs.com/pbs/v1/auction', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(req.serialize()),
        })
          .then(resp => resp.json())
          .then((json) => {
            auction.response(context.type, json);
          })
          .catch(error => console.warn('error occurred:', error));
      });
  }
}

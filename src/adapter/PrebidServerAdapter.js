import Request from '../request';
import Adapter from './Adapter';
import AdUnit from '../adunit';

const type = 'PREBID_SERVER_ADAPTER';

export default class PrebidServerAdapter extends Adapter {
  accountId: String;
  buildRequestTimeout: number;

  constructor(
    accountId: String,
    buildRequestTimeout: number,
    factory?: (req: Request) => mixed,
  ) {
    super(type, factory);
    this.accountId = accountId;
    this.buildRequestTimeout = buildRequestTimeout;
  }

  request(adUnits: AdUnit[]): Promise {
    return new Promise((resolve, reject) => {
      let requestTimeout = null;
      const context: PrebidServerAdapter = this;

      super.request(this.buildRequestTimeout)
        .then((req: Request) => {
          requestTimeout = setTimeout(
            reject.bind(reject, `${type}: request timeout`),
            this.buildRequestTimeout,
          );

          req.accountId(context.accountId);
          adUnits.map(adUnit => req.adUnit(adUnit));

          fetch('https://prebid.adnxs.com/pbs/v1/auction', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.serialize()),
          })
            .then(resp => resp.json())
            .then((json) => {
              resolve(json);
            })
            .catch(() => {
              reject.call(reject, `${type}: request failed`);
            });
        })
        .catch((error) => {
          if (requestTimeout !== null) {
            clearTimeout(requestTimeout);
          }
          reject.call(reject, error);
        });
    });
  }
}

import Adapter from './Adapter';
import AdUnit from '../adunit';

export default class PrebidServerAdapter extends Adapter {
  type: String = 'PREBID_SERVER_ADAPTER';

  requestBid(adUnits: AdUnit[]) {
    const req = this.requestFactory.request(this.type);
    adUnits.map(adUnit => req.adUnit(adUnit));
  }
}

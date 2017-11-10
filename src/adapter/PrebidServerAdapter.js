import Adapter from './Adapter';
import AdUnit from '../adunit';
import Request from '../request';

export default class PrebidServerAdapter extends Adapter {
  type: String = 'PREBID_SERVER_ADAPTER';

  static requestBid(adUnits: AdUnit[]) {
    const req = new Request();
    adUnits.map(adUnit => req.adUnit(adUnit));
  }
}

import AdUnit from '../adunit';
import Request from '../request';

export default class PrebidServerAdapter {
  requestBid(adUnits: AdUnit[]) {
    const req = new Request();
    adUnits.map(adUnit => req.adUnit(adUnit));
  }
}

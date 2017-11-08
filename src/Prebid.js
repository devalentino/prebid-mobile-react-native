import AdUnit from './AdUnit';

export default class Prebid {
  adUnits: AdUnit[];
  accountId: String;

  constructor(adUnits: AdUnit[], accountId:String) {
    this.adUnits = adUnits;
    this.accountId = accountId;
  }
}

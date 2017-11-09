import AdUnit from './adunit/index';

export default class Prebid {
  adUnits: AdUnit[];
  accountId: String;

  constructor(adUnits: AdUnit[], accountId:String) {
    this.adUnits = adUnits;
    this.accountId = accountId;
  }
}

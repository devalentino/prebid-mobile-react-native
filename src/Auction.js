import uuid from 'uuid/v4';
import AdUnit from './adunit';

export default class Auction {
  auctionId: String;
  adUnits: AdUnit[];

  constructor(adUnits: AdUnit[], auctionId?: String) {
    this.adUnits = adUnits;
    if (typeof auctionId !== 'undefined') {
      this.auctionId = auctionId;
    } else {
      this.auctionId = uuid();
    }
  }
}

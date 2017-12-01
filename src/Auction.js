import uuid from 'uuid/v4';
import AdUnit from './adunit';

export default class Auction {
  auctionId: String;
  adUnits: AdUnit[];
  completed: Boolean;
  result: Object;

  constructor(
    adUnits: AdUnit[],
    auctionId?: String,
  ) {
    this.adUnits = adUnits;
    this.result = {};
    this.completed = false;

    if (typeof auctionId !== 'undefined') {
      this.auctionId = auctionId;
    } else {
      this.auctionId = uuid();
    }
  }

  addResponse(adapter: String, response: Object) {
    this.result[adapter] = response;
  }

  complete() {
    this.completed = true;
  }
}

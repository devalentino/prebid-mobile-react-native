import uuid from 'uuid/v4';
import AdUnit from './adunit';

export default class Auction {
  auctionId: String;
  adUnits: AdUnit[];
  completed: Boolean;
  result: Object;
  errors: Object;

  constructor(
    adUnits: AdUnit[],
    auctionId?: String,
  ) {
    this.adUnits = adUnits;
    this.result = {};
    this.errors = {};
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

  addError(adapter: String, error: Error) {
    this.errors[adapter] = error;
  }

  complete() {
    this.completed = true;
  }
}

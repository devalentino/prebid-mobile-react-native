import uuid from 'uuid/v4';
import AdUnit from './adunit';
import { strategies } from './Settings';

export default class Auction {
  auctionId: String;
  adUnits: AdUnit[];
  adapters: String[];
  strategy: number;
  completed: Boolean;
  result: Object;

  constructor(
    adUnits: AdUnit[],
    adapters: String[],
    strategy: number,
    auctionId?: String,
  ) {
    this.adUnits = adUnits;
    this.adapters = adapters;
    this.strategy = strategy;
    this.result = {};
    this.completed = false;

    if (typeof auctionId !== 'undefined') {
      this.auctionId = auctionId;
    } else {
      this.auctionId = uuid();
    }
  }

  response(adapter: String, resp: Object) {
    if (this.completed) return;

    this.result[adapter] = resp;

    switch (this.strategy) {
      case strategies.ON_FIRST_RESPONSE:
        this.complete();
        return;
      case strategies.ON_EVERY_RESPONSE:
        this._deliver();
        return;
      default:
        if (Object.keys(this.result).length === this.adapters.length) {
          this.complete();
        }
    }
  }

  complete() {
    this._deliver();
    this.completed = true;
  }

  _deliver() {
    if (Object.keys(this.result).length === 0) return;

    this.adUnits.forEach((adUnit) => {
      adUnit.callbacks.forEach((callback) => {
        callback.call(adUnit, this.result);
      });
    });
  }
}

import AdUnit from './adunit';

export default class BidHandler {
  active: boolean;
  adUnits: AdUnit[];

  constructor() {
    this.active = true;
    this.adUnits = [];
  }

  registerAdUnit(adUnit: AdUnit) {
    this.adUnits.push(adUnit);
  }

  requestAds() {
    if (!this.active) {
      throw new Error('Bid handler is not active');
    }

    // TODO: run through all the ad units and request bids
  }
}

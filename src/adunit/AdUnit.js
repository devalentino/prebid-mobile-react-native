import AdSize from './AdSize';

export const adUnitTypes: Object = {
  BANNER: 'BANNER',
  INTERSTITIAL: 'INTERSTITIAL',
};

export default class AdUnit {
  type: String;
  auctionId: String;
  code: String;
  configId: String;
  sizes: Set<AdSize>;
  callbacks: Array<(AdUnit) => mixed>;

  constructor(code: String, configId: String, auctionId: String) {
    this.code = code;
    this.configId = configId;
    this.auctionId = auctionId;
    this.sizes = new Set();
    this.callbacks = [];
  }

  addSize(width: number, height: number) {
    this.sizes.add(new AdSize(width, height));
  }

  addResponceCallback(callback: (AdUnit) => mixed) {
    this.callbacks.push(callback);
  }
}

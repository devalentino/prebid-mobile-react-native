import uuid from 'uuid/v4';
import AdSize from './AdSize';

export default class AdUnit {
  auctionId: String;
  code: String;
  configId: String;
  sizes: Set<AdSize>;

  constructor(code: String, configId: String) {
    this.code = code;
    this.configId = configId;
    this.sizes = [];
    this.auctionId = uuid();
  }

  addSize(width: number, height: number) {
    this.sizes.add(new AdSize(width, height));
  }
}

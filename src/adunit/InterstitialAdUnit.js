import { standardSizes } from './AdSize';
import AdUnit from './AdUnit';


export default class InterstitialAdUnit extends AdUnit {
  static get type(): String {
    return 'INTERSTITIAL';
  }

  static set type(value: String) {
    throw new ReferenceError('Disabled for the changes');
  }

  width: number;
  height: number;

  constructor(code: String, configId: String, width: number, height: number) {
    super(code, configId);
    this.width = width;
    this.height = height;
  }

  serialize() {
    const unitSizes = [];

    standardSizes.forEach((size) => {
      if (size.width <= this.width && size.height <= this.height) {
        unitSizes.push({
          w: size.width,
          h: size.height,
        });
      }
    });

    return {
      config_id: this.configId,
      code: this.code,
      sizes: unitSizes,
    };
  }
}

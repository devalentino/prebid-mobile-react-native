import AdSize from './AdSize';

export const adUnitTypes: Object = {
  BANNER: 'BANNER',
  INTERSTITIAL: 'INTERSTITIAL',
};

export default class AdUnit {
  type: String;
  code: String;
  configId: String;
  sizes: Set<AdSize>;
  callbacks: Array<(AdUnit) => mixed>;

  constructor(code: String, configId: String) {
    this.code = code;
    this.configId = configId;
    this.sizes = new Set();
    this.callbacks = [];
  }

  addSize(width: number, height: number) {
    this.sizes.add(new AdSize(width, height));
  }

  addResponseCallback(callback: (AdUnit) => mixed) {
    this.callbacks.push(callback);
  }

  serialize(width: number, height: number): Object {
    const unitSizes = [];

    this.sizes.forEach((size) => {
      unitSizes.push({
        w: size.width,
        h: size.height,
      });
    });

    return {
      config_id: this.configId,
      code: this.code,
      sizes: unitSizes,
    };
  }
}

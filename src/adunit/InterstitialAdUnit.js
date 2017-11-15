import AdSize from './AdSize';
import AdUnit from './AdUnit';

const standardSizes = new Set();
standardSizes.add(new AdSize(300, 250));
standardSizes.add(new AdSize(300, 600));
standardSizes.add(new AdSize(320, 250));
standardSizes.add(new AdSize(254, 133));
standardSizes.add(new AdSize(580, 400));
standardSizes.add(new AdSize(320, 320));
standardSizes.add(new AdSize(320, 160));
standardSizes.add(new AdSize(320, 480));
standardSizes.add(new AdSize(336, 280));
standardSizes.add(new AdSize(320, 400));
standardSizes.add(new AdSize(1, 1));

export default class InterstitialAdUnit extends AdUnit {
  static get type(): String {
    return 'INTERSTITIAL';
  }

  static set type(value: String) {
    throw new ReferenceError('Disabled for the changes');
  }

  serialize(width: number, height: number) {
    const unitSizes = [];

    standardSizes.forEach((size) => {
      if (size.width <= width && size.height <= height) {
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

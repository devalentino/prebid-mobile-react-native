import AdUnit from './AdUnit';

export default class InterstitialAdUnit extends AdUnit {
  static get type(): String {
    return 'INTERSTITIAL';
  }

  static set type(value: String) {
    throw new ReferenceError('Disabled for the changes');
  }
}

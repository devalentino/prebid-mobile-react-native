import AdUnit from './AdUnit';

export default class BannerAdUnit extends AdUnit {
  static get type(): String {
    return 'BANNER';
  }

  static set type(value: String) {
    throw new ReferenceError('Disabled for the changes');
  }
}

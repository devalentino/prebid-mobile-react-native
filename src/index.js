import Prebid from './Prebid';
import { PrebidServerAdapter } from './adapter/index';
import { BannerAdUnit, InterstitialAdUnit } from './adunit/index';
import { strategies } from './Settings';

export default Prebid;
export {
  PrebidServerAdapter,
  BannerAdUnit,
  InterstitialAdUnit,
  strategies,
};

import Prebid from './src/Prebid';
import { PrebidServerAdapter } from './src/adapter';
import { BannerAdUnit, InterstitialAdUnit } from './src/adunit';
import { strategies } from './src/Settings';

export default Prebid;
export {
  PrebidServerAdapter,
  BannerAdUnit,
  InterstitialAdUnit,
  strategies,
};

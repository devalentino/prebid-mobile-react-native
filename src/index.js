import Prebid from './Prebid';
import Adapter, { PrebidServerAdapter } from './adapter/index';
import AdUnit, { BannerAdUnit, InterstitialAdUnit } from './adunit/index';
import { strategies } from './Settings';

export default Prebid;
export {
  Adapter,
  PrebidServerAdapter,
  AdUnit,
  BannerAdUnit,
  InterstitialAdUnit,
  strategies,
};

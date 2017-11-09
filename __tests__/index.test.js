import AdUnit, { BannerAdUnit, InterstitialAdUnit } from '../src/adunit';
import Request from '../src/request';


test('test request', () => {
  const adUnit1: AdUnit = new BannerAdUnit('Banner_320x50', 'eebc307d-7f76-45d6-a7a7-68985169b138');
  adUnit1.addSize(320, 50);

  const adUnit2 = new BannerAdUnit('Banner_300x250', '0c286d00-b3ee-4550-b15d-f71f8e746865');
  adUnit2.addSize(320, 50);

  const adUnit3 = new InterstitialAdUnit('Interstitial_Ad_Unit_ID', 'eebc307d-7f76-45d6-a7a7-68985169b138');

  const adUnits: AdUnit[] = [
    adUnit1,
    adUnit2,
    adUnit3,
  ];

  const req: Request = new Request()
    .accountId('test-account-1234567890')
    .tid('test-request-1234567890');

  req.device()
    .make('Xiaomi')
    .model('Mi 3')
    .ua('Mozilla/5.0 (Linux; Android 4.4.4; MI 3W Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36')
    .w(1080)
    .h(1920)
    .pxratio(441)
    .mccmnc('310-005')
    .carrier('VERIZON')
    .connectiontype(2)
    .devtime(new Date().getMilliseconds())
    .lmt(0)
    .ifa('my-adv-id')
    .os('Android')
    .osv('4.3');

  req.device().geo()
    .lat(0)
    .lon(0)
    .lastfix(0)
    .accuracy(0);

  req.app()
    .bundle('org.prebid.reactnative.test')
    .ver(1)
    .name('Test Client')
    .domain('prebid.org')
    .storeurl('http://prebid.org')
    .privacypolicy(0);

  req.user()
    .age(21)
    .gender('M')
    .language('EN');

  req.sdk()
    .source('prebid-react-native')
    .version('0.1.0')
    .platform('android');
});

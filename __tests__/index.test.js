import Request from '../src/request';


test('test request', () => {
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

import { InterstitialAdUnit, BannerAdUnit } from '../src/adunit';
import { PrebidServerAdapter, types } from '../src/adapter';
import Auction from '../src/Auction';

test('constructor', () => {
  const adapter = new PrebidServerAdapter('test-account-id', 1000);

  expect(adapter.type).toEqual(types.PREBID_SERVER_ADAPTER);
  expect(adapter.buildRequestTimeout).toEqual(1000);
});

test('constructor with factory', () => {
  const factory = (req, resolve) => {
    resolve();
  };
  const adapter = new PrebidServerAdapter('test-account-id', 1000, factory);

  expect(adapter.factory).toEqual(factory);
});

test('request factory resolved', () => {
  const now = new Date().getMilliseconds();

  const adUnit1 = new InterstitialAdUnit(
    'Interstitial',
    'test-config-id',
    1080,
    1920,
  );

  const adUnit2 = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit2.addSize(320, 50);

  const factory = (req, resolve) => {
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
      .devtime(now)
      .lmt(0)
      .ifa('my-adv-id')
      .os('Android')
      .osv('4.3');

    req.device().geo()
      .lat(51.5033640)
      .lon(-0.1276250)
      .accuracy(20)
      .lastfix(now);

    req.app()
      .bundle('org.prebid.test.bundle')
      .ver('0.0.1')
      .name('Test app')
      .domain('prebid.org')
      .storeurl('http://play.google.com/test')
      .privacypolicy(0);

    req.user()
      .age(25)
      .gender('M')
      .language('EN');

    req.sdk()
      .source('prebid-react-native')
      .version('0.1.0')
      .platform('react-native');

    req
      .cacheMarkup(1)
      .sortBids(1)
      .accountId('test-account-id')
      .tid('test-tid');

    resolve();
  };

  const adapter = new PrebidServerAdapter('test-account-id', 1000, factory);

  const auction = new Auction(
    [adUnit1, adUnit2],
    'test-auction-id',
  );

  fetch.mockResponseOnce(JSON.stringify({ test: 'response' }));

  return adapter.request(auction.adUnits)
    .then((resp) => {
      expect(resp).toEqual({ test: 'response' });
    });
});

test('request factory timeout', () => {
  const now = new Date().getMilliseconds();

  const adUnit1 = new InterstitialAdUnit(
    'Interstitial',
    'test-config-id',
    1080,
    1920,
  );

  const adUnit2 = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit2.addSize(320, 50);

  const factory = (req, resolve) => {
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
      .devtime(now)
      .lmt(0)
      .ifa('my-adv-id')
      .os('Android')
      .osv('4.3');

    req.device().geo()
      .lat(51.5033640)
      .lon(-0.1276250)
      .accuracy(20)
      .lastfix(now);

    req.app()
      .bundle('org.prebid.test.bundle')
      .ver('0.0.1')
      .name('Test app')
      .domain('prebid.org')
      .storeurl('http://play.google.com/test')
      .privacypolicy(0);

    req.user()
      .age(25)
      .gender('M')
      .language('EN');

    req.sdk()
      .source('prebid-react-native')
      .version('0.1.0')
      .platform('react-native');

    req
      .cacheMarkup(1)
      .sortBids(1)
      .accountId('test-account-id')
      .tid('test-tid');

    setTimeout(() => {
      resolve();
    }, 1200);
  };

  const adapter = new PrebidServerAdapter('test-account-id', 1000, factory);

  const auction = new Auction(
    [adUnit1, adUnit2],
    'test-auction-id',
  );

  fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({ test: 'response' }));

  return adapter.request(auction.adUnits)
    .catch((error) => {
      expect(error).toEqual('PREBID_SERVER_ADAPTER: request build timeout');
    });
});

test('request failed', () => {
  const now = new Date().getMilliseconds();

  const adUnit1 = new InterstitialAdUnit(
    'Interstitial',
    'test-config-id',
    1080,
    1920,
  );

  const adUnit2 = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit2.addSize(320, 50);

  const factory = (req, resolve) => {
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
      .devtime(now)
      .lmt(0)
      .ifa('my-adv-id')
      .os('Android')
      .osv('4.3');

    req.device().geo()
      .lat(51.5033640)
      .lon(-0.1276250)
      .accuracy(20)
      .lastfix(now);

    req.app()
      .bundle('org.prebid.test.bundle')
      .ver('0.0.1')
      .name('Test app')
      .domain('prebid.org')
      .storeurl('http://play.google.com/test')
      .privacypolicy(0);

    req.user()
      .age(25)
      .gender('M')
      .language('EN');

    req.sdk()
      .source('prebid-react-native')
      .version('0.1.0')
      .platform('react-native');

    req
      .cacheMarkup(1)
      .sortBids(1)
      .accountId('test-account-id')
      .tid('test-tid');

    resolve();
  };

  const adapter = new PrebidServerAdapter('test-account-id', 1000, factory);

  const auction = new Auction(
    [adUnit1, adUnit2],
    'test-auction-id',
  );

  fetch.resetMocks();
  fetch.mockRejectOnce();

  return adapter.request(auction.adUnits)
    .catch((error) => {
      expect(error).toEqual('PREBID_SERVER_ADAPTER: request failed');
    });
});

test('request request parameters', (done) => {
  const now = new Date().getMilliseconds();

  const adUnit1 = new InterstitialAdUnit(
    'Interstitial',
    'test-config-id',
    1080,
    1920,
  );

  const adUnit2 = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit2.addSize(320, 50);

  const factory = (req, resolve) => {
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
      .devtime(now)
      .lmt(0)
      .ifa('my-adv-id')
      .os('Android')
      .osv('4.3');

    req.device().geo()
      .lat(51.5033640)
      .lon(-0.1276250)
      .accuracy(20)
      .lastfix(now);

    req.app()
      .bundle('org.prebid.test.bundle')
      .ver('0.0.1')
      .name('Test app')
      .domain('prebid.org')
      .storeurl('http://play.google.com/test')
      .privacypolicy(0);

    req.user()
      .age(25)
      .gender('M')
      .language('EN');

    req.sdk()
      .source('prebid-react-native')
      .version('0.1.0')
      .platform('react-native');

    req
      .cacheMarkup(1)
      .sortBids(1)
      .accountId('test-account-id')
      .tid('test-tid');

    resolve();
  };

  const adapter = new PrebidServerAdapter('test-account-id', 1000, factory);

  const auction = new Auction(
    [adUnit1, adUnit2],
    'test-auction-id',
  );

  fetch = jest.fn((url, params) => {
    expect(url).toEqual('https://prebid.adnxs.com/pbs/v1/auction');
    expect(params.method).toEqual('POST');
    expect(params.headers.Accept).toEqual('application/json');
    expect(params.headers['Content-Type']).toEqual('application/json');

    const body = JSON.parse(params.body);

    expect(body.account_id).toEqual('test-account-id');
    expect(body.ad_units.length).toEqual(2);
    expect(body.ad_units[0]).toEqual({
      config_id: 'test-config-id',
      code: 'Interstitial',
      sizes: [
        {
          w: 300,
          h: 250,
        }, {
          w: 300,
          h: 600,
        }, {
          w: 320,
          h: 250,
        }, {
          w: 254,
          h: 133,
        }, {
          w: 580,
          h: 400,
        }, {
          w: 320,
          h: 320,
        }, {
          w: 320,
          h: 160,
        }, {
          w: 320,
          h: 480,
        }, {
          w: 336,
          h: 280,
        }, {
          w: 320,
          h: 400,
        }, {
          w: 1,
          h: 1,
        }],
    });
    expect(body.ad_units[1]).toEqual({
      config_id: 'test-config-id',
      code: 'Banner_320x50',
      sizes: [
        {
          w: 320,
          h: 50,
        }],
    });

    done();
  });

  adapter.request(auction.adUnits);
});

import { InterstitialAdUnit, BannerAdUnit } from '../src/adunit';
import { PrebidServerAdapter, types } from '../src/adapter';
import Auction from '../src/Auction';
import { strategies } from '../src/Settings';

test('constructor', () => {
  const adapter = new PrebidServerAdapter(1000);

  expect(adapter.type).toEqual(types.PREBID_SERVER_ADAPTER);
  expect(adapter.buildRequestTimeout).toEqual(1000);
});

test('constructor with factory', () => {
  const factory = (req, resolve) => {
    resolve();
  };
  const adapter = new PrebidServerAdapter(1000, factory);

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

  const adapter = new PrebidServerAdapter(1000, factory);

  const auction = new Auction(
    [adUnit1, adUnit2],
    [adapter],
    strategies.ON_EVERY_RESPONSE,
    'test-auction-id',
  );
  const expected = {};
  expected[adapter.type] = { test: 'response' };
  const auctionCallback = jest.fn(() => {});
  auction.addCallback(auctionCallback);

  fetch.mockResponseOnce(JSON.stringify({ test: 'response' }));

  adapter.request(auction);

  // TODO: find out how to manage without setTimeout
  setTimeout(() => {
    expect(auctionCallback).toHaveBeenCalledWith(expected);
  }, 0);
});

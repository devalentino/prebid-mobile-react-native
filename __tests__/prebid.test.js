import AdUnit, { BannerAdUnit, InterstitialAdUnit } from '../src/adunit';
import Prebid from '../src/Prebid';
import { strategies } from '../src/Settings';
import Adapter, { PrebidServerAdapter } from '../src/adapter';

test('constructor adUnits', () => {
  const adUnit1: AdUnit = new InterstitialAdUnit(
    'Interstitial',
    'test-config-id',
    1080,
    1920,
  );

  const adUnit2: AdUnit = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit2.addSize(320, 50);

  const prebidArgs = {
    adUnits: [adUnit1, adUnit2],
  };

  const prebid: Prebid = new Prebid(prebidArgs);

  expect(prebid.bidHandler.adUnits).toEqual([adUnit1, adUnit2]);
});

test('constructor settings', () => {
  const prebidArgs = {
    settings: {
      adRequestPeriod: 5 * 60 * 1000,
      adRequestTimeout: 6 * 1000,
      strategy: strategies.ON_EVERY_RESPONSE,
    },
  };

  const prebid: Prebid = new Prebid(prebidArgs);

  expect(prebid.conf.adRequestPeriod).toEqual(5 * 60 * 1000);
  expect(prebid.conf.adRequestTimeout).toEqual(6 * 1000);
  expect(prebid.conf.strategy).toEqual(strategies.ON_EVERY_RESPONSE);
});

test('constructor default settings', () => {
  const prebid: Prebid = new Prebid();

  expect(prebid.conf.adRequestPeriod).toEqual(2 * 60 * 1000);
  expect(prebid.conf.adRequestTimeout).toEqual(5 * 1000);
  expect(prebid.conf.strategy).toEqual(strategies.ON_ALL_RESPONSES);
});

test('constructor adapters', () => {
  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 5 * 1000);

  const prebidArgs = {
    adapters: [adapter],
  };

  const prebid: Prebid = new Prebid(prebidArgs);

  expect(prebid.bidHandler.adapters).toContainEqual(adapter);
});

test('constructor adapters no duplicates', () => {
  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 5 * 1000);

  const prebidArgs = {
    adapters: [adapter, adapter],
  };

  const prebid: Prebid = new Prebid(prebidArgs);

  expect(prebid.bidHandler.adapters.size).toEqual(1);
});

test('constructor callbacks', () => {
  const onAuctionCallback = () => {};

  const prebidArgs = {
    callbacks: {
      onAuction: onAuctionCallback,
    },
  };

  const prebid: Prebid = new Prebid(prebidArgs);

  expect(prebid.bidHandler.callbacks).toHaveProperty(
    'onAuction',
    [onAuctionCallback],
  );
});

test('settings', () => {
  const prebidArgs = {
    settings: {
      adRequestPeriod: 5 * 60 * 1000,
      adRequestTimeout: 6 * 1000,
      strategy: strategies.ON_EVERY_RESPONSE,
    },
  };

  const prebid: Prebid = new Prebid(prebidArgs);

  expect(prebid.conf.adRequestPeriod).toEqual(5 * 60 * 1000);
  expect(prebid.conf.adRequestTimeout).toEqual(6 * 1000);
  expect(prebid.conf.strategy).toEqual(strategies.ON_EVERY_RESPONSE);

  const newSettings = {
    strategy: strategies.ON_FIRST_RESPONSE,
  };

  prebid.settings(newSettings);

  expect(prebid.conf.adRequestPeriod).toEqual(5 * 60 * 1000);
  expect(prebid.conf.adRequestTimeout).toEqual(6 * 1000);
  expect(prebid.conf.strategy).toEqual(strategies.ON_FIRST_RESPONSE);
});

test('register adapter', () => {
  const prebid: Prebid = new Prebid();

  expect(prebid.bidHandler.adapters.size).toEqual(0);

  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 5 * 1000);
  prebid.registerAdapter(adapter);

  expect(prebid.bidHandler.adapters.size).toEqual(1);
  expect(prebid.bidHandler.adapters).toContainEqual(adapter);
});

test('start', () => {
  const prebid: Prebid = new Prebid();

  expect(prebid.bidHandler.active).toEqual(false);
  expect(prebid.requestAdsInterval).toBeUndefined();

  prebid.start();

  expect(prebid.bidHandler.active).toEqual(true);
  expect(prebid.requestAdsInterval).not.toBeUndefined();

  clearInterval(prebid.requestAdsInterval);
});

test('start single', () => {
  const prebid: Prebid = new Prebid();

  expect(prebid.bidHandler.active).toEqual(false);
  expect(prebid.requestAdsInterval).toBeUndefined();

  prebid.conf.adRequestPeriod = 0;
  prebid.start();

  expect(prebid.bidHandler.active).toEqual(true);
  expect(prebid.requestAdsInterval).toBeUndefined();
});

test('stop', () => {
  const prebid: Prebid = new Prebid();

  prebid.bidHandler.active = true;
  prebid.requestAdsInterval = setInterval(() => {}, 2000);

  prebid.stop();

  expect(prebid.bidHandler.active).toEqual(false);
  expect(prebid.requestAdsInterval).toBe(null);
});

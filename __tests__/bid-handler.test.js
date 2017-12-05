import BidHandler from '../src/BidHandler';
import AdUnit, { BannerAdUnit } from '../src/adunit';
import Adapter, { PrebidServerAdapter } from '../src/adapter';
import Auction from '../src/Auction';
import { strategies } from '../src/Settings';

test('constructor', () => {
  const handler: BidHandler = new BidHandler();

  expect(handler.active).toEqual(false);
  expect(handler.adapters.size).toEqual(0);
  expect(handler.adUnits.length).toEqual(0);
  expect(Object.keys(handler.callbacks).length).toEqual(0);
});

test('register AdUnit', () => {
  const handler: BidHandler = new BidHandler();

  expect(handler.adUnits.length).toEqual(0);

  const adUnit: AdUnit = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit.addSize(320, 50);
  handler.registerAdUnit(adUnit);

  expect(handler.adUnits.length).toEqual(1);
  expect(handler.adUnits[0]).toEqual(adUnit);
});

test('register Adapter', () => {
  const handler: BidHandler = new BidHandler();

  expect(handler.adapters.size).toEqual(0);

  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 1000);
  handler.registerAdapter(adapter);

  expect(handler.adapters.size).toEqual(1);
  expect(handler.adapters).toContain(adapter);
});

test('add Callback', () => {
  const handler: BidHandler = new BidHandler();

  expect(Object.keys(handler.callbacks).length).toEqual(0);

  const callback = () => {};
  handler.addCallback('onAuction', callback);

  expect(Object.keys(handler.callbacks).length).toEqual(1);
  expect(handler.callbacks.onAuction[0]).toEqual(callback);
});

test('add multiple Callbacks', () => {
  const handler: BidHandler = new BidHandler();

  expect(Object.keys(handler.callbacks).length).toEqual(0);

  const callback = () => {};
  handler.addCallback('onAuction', callback);
  handler.addCallback('onAuction', callback);
  handler.addCallback('onAuction', callback);

  expect(Object.keys(handler.callbacks).length).toEqual(1);
  expect(handler.callbacks.onAuction.length).toEqual(3);

  expect(handler.callbacks.onAuction[0]).toEqual(callback);
  expect(handler.callbacks.onAuction[1]).toEqual(callback);
  expect(handler.callbacks.onAuction[2]).toEqual(callback);
});

test('request Ads', (done) => {
  const handler: BidHandler = new BidHandler();

  const adUnit: AdUnit = new BannerAdUnit('Banner_320x50', 'test-config-id');
  adUnit.addSize(320, 50);
  handler.registerAdUnit(adUnit);

  const myAdapter: Adapter = new PrebidServerAdapter('test-account-id', 1000);
  myAdapter.request = jest.fn(() =>
    new Promise(resolve => resolve({ test: 'response' })));
  handler.registerAdapter(myAdapter);

  handler.response = jest.fn((adapter, strategy, auction, response) => {
    expect(response).toEqual({ test: 'response' });
    expect(strategy).toEqual(strategies.ON_FIRST_RESPONSE);
    expect(adapter).toEqual(myAdapter);
    expect(auction).not.toBeUndefined();
    done();
  });

  expect(() => { handler.requestAds(1000, strategies.ON_FIRST_RESPONSE); })
    .toThrow('Bid handler is not active');

  handler.active = true;
  expect(() => { handler.requestAds(1000, strategies.ON_FIRST_RESPONSE); })
    .not.toThrow('Bid handler is not active');
});

test('response ON_FIRST_RESPONSE', () => {
  const handler: BidHandler = new BidHandler();
  handler.complete = jest.fn();

  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 1000);

  const auction: Auction = new Auction();
  auction.addResponse = jest.fn();

  handler.response(
    adapter,
    strategies.ON_FIRST_RESPONSE,
    auction,
    { test: 'response' },
  );

  expect(auction.addResponse)
    .toHaveBeenCalledWith(adapter.type, { test: 'response' });
  expect(handler.complete).toHaveBeenCalledWith(auction);
});

test('response ON_EVERY_RESPONSE', () => {
  const handler: BidHandler = new BidHandler();
  handler.complete = jest.fn();
  handler.deliver = jest.fn();

  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 1000);

  const auction: Auction = new Auction();
  auction.addResponse = jest.fn();

  handler.response(
    adapter,
    strategies.ON_EVERY_RESPONSE,
    auction,
    { test: 'response' },
  );

  expect(auction.addResponse)
    .toHaveBeenCalledWith(adapter.type, { test: 'response' });
  expect(handler.complete).not.toHaveBeenCalled();
  expect(handler.deliver).toHaveBeenCalledWith(auction);
});

test('response ON_ALL_RESPONSES not all', () => {
  class TestAdapter extends Adapter {
    constructor() {
      super('test-adapter');
    }
  }

  const handler: BidHandler = new BidHandler();
  handler.complete = jest.fn();
  handler.deliver = jest.fn();

  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 1000);

  handler.registerAdapter(adapter);
  handler.registerAdapter(new TestAdapter());

  const auction: Auction = new Auction();

  handler.response(
    adapter,
    strategies.ON_ALL_RESPONSES,
    auction,
    { test: 'response' },
  );

  expect(handler.complete).not.toHaveBeenCalled();
});

test('response ON_ALL_RESPONSES all', () => {
  class TestAdapter extends Adapter {
    constructor() {
      super('test-adapter');
    }
  }

  const handler: BidHandler = new BidHandler();
  handler.complete = jest.fn();
  handler.deliver = jest.fn();

  const adapter: Adapter = new PrebidServerAdapter('test-account-id', 1000);
  const adapter2: Adapter = new TestAdapter();

  handler.registerAdapter(adapter);
  handler.registerAdapter(adapter2);

  const auction: Auction = new Auction();

  handler.response(
    adapter,
    strategies.ON_ALL_RESPONSES,
    auction,
    { test: 'response' },
  );

  expect(handler.complete).not.toHaveBeenCalled();

  handler.response(
    adapter2,
    strategies.ON_ALL_RESPONSES,
    auction,
    { test: 'response' },
  );

  expect(handler.complete).toHaveBeenCalledWith(auction);
});


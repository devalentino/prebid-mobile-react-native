# Prebid Mobile React Native SDK

React native SDK for header bidding application built with React Native.

Library is fully implemented, however it was not tested yet. You can use for open beta purposes.  

## Installation

```sh
npm install --save prebid-mobile-react-native
```

## Usage

Library provides set of classes to work with header bidder ad exchanges. Please see classes description below. Also you can find demo [here](https://github.com/devalentino/prebid-mobile-react-native-demo).  

### AdUnit

To start working with library you should create adUnits. Ad units should be registered in [Prebid](#prebid). 

```javascript
const interstitial = new InterstitialAdUnit('Interstitial', configId, 1080, 1920);
const headerBanner = new BannerAdUnit('HeaderBanner320x50', configId);
headerBanner.addSize(320, 50);
```
Library providers two types of banners:

##### Interstitial

Covers phone's screen. Constructor arguments:

* `code` - adUnit marker rot recognition, user defined;
* `configId` - configuration ID on exchange side;
* `width` - screen width, should be taken from device info API;
* `height` - screen height, should be taken from device info API;

##### Banner

Banner representation. Constructor arguments:

* `code` - adUnit marker rot recognition, user defined;
* `configId` - configuration ID on exchange side;

Banner has method `addSize`, with `width` and `height` arguments. You can use multiple sizes for same ad unit.

##### User's implementations

There is option to implement your own ad units. All you need to do it is import `AdUnit` class and extend it.

```javascript
import { AdUnit } from 'prebid-mobile-react-native';

class MyCustomAdUnit extends AdUnit {
  // Implementation here
}
```

### Adapter

Adapters are interfaces for communication with exchanges. Current version has only [AppNexus](https://prebid.adnxs.com/) exchange implementation - `PrebidServerAdapter`.

 ```javascript
const prebidServerAdapter = new PrebidServerAdapter(accountId, 1000, prebidAdapterFactory);
```

##### PrebidServerAdapter

Adapter for [AppNexus](https://prebid.adnxs.com/) exchange. Constructor arguments:

* `accountId` - account ID on exchange side;
* `buildRequestTimeout` - time to request build, milliseconds (see details below);
* `factory` - function to build request;

##### Factory

As getting device information and geo location takes some time, library designed in way, when you build ad request wrapped in Promise.
Promise rejects in `buildRequestTimeout` time if you don't resolve promise before. Factory function should have 2 arguments: `request` and `resolve`:

```javascript
const prebidAdapterFactory = (req, resolve) => {
  // build request here
  // call resolve() when request ready
}
```

##### User's implementations

There is option to implement your own adapters. All you need to do it is import `Adapter` class and extend it.

```javascript
import { Adapter } from 'prebid-mobile-react-native';

class MyCustomAdapter extends Adapter {
  // Implementation here
}
```

### Prebid

Prebid is top level API which manages the process. Prebid class has `start` method to request ads and `stop` to stop requests.

There is one constructor argument - object with Prebid settings, ad units, adapters and callbacks.

Example:
```javascript
this.prebid = new Prebid({
  settings: {
    adRequestPeriod: 5 * 60 * 1000,
    adRequestTimeout: 6 * 1000,
    strategy: strategies.ON_EVERY_RESPONSE,
  },
  adUnits: [interstitial, headerBanner],
  adapters: [prebidServerAdapter],
  callbacks: {
    onAuction: [onAuctionCallback],
  },
});

this.prebid.start();
```

##### settings

Section is not required. There are default settings. Settings section supports next Prebid settings:

* `adRequestPeriod` - Period of exchange call, milliseconds. Default is 2 min (library requests ads every 2 min);
* `adRequestTimeout` - Time to get ads, milliseconds. Default is 5 sec (if no response after 5 sec, timeout error occurs);
* `strategy` - callback strategy invocation, default `strategies.ON_ALL_RESPONSES`;

###### strategies

Strategy defines callback strategy invocation. You can see list of possible callbacks below. Now you should know that you receive ads earlier/later, more/less based on strategy;

```javascript
import { strategies } from 'prebid-mobile-react-native';
``` 

There are three strategies:

* `strategies.ON_FIRST_RESPONSE` - call onAuction callback on first response. Skip all other responses;
* `strategies.ON_ALL_RESPONSES` - call onAuction callback when all responses (or errors) completed;
* `strategies.ON_EVERY_RESPONSE` - call onAuction callback on every response;

If you need keep things simple and get the best price, use `ON_ALL_RESPONSES` strategy. Then you will be able to choose the best price from all responses;

If you need keep things simple and show ads as soon as possible, use `ON_FIRST_RESPONSE` strategy.

If you want to control all the process, you can choose `ON_EVERY_RESPONSE` strategy. Then your callback invoked every time library get response from one of exchanges;

##### adUnits

list of AdUnits defined [above](#adunit)

##### adapters

List of Adapters defined [above](#adapter)

##### callbacks

Callbacks section responsible for library events registration. In current implementation only `onAuction` and `onError` events implemented.

###### onAuction

Invoked when auction ready (depends on strategies). You can provide list of callbacks which will be called.

Function receives auction argument - object, which contains all the responses, errors, adUnits and auction status.

```javascript
const onAuctionCallback = (auction) => {
  // your logic here
};
```
###### onError

Invoked when adapter error occurs. You can provide list of callbacks which will be called.

Function receives adapter type and error as arguments.

```javascript
const onErrorCallback = (adapterType, error) => {
  // your logic here
};
```

## Demo

You can find working demo [here](https://github.com/devalentino/prebid-mobile-react-native-demo)

## Contributing

You are able to contribute if you find any bugs. But before sending pull request please make sure you covered bug with unit test and all other test didn't fail 
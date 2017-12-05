import { Dimensions, PixelRatio, NetInfo } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CarrierInfo from 'react-native-carrier-info';
import uuid from 'uuid/v4';
import Prebid from '../src/Prebid';
import Request, { Geo } from '../src/request';
import { PrebidServerAdapter } from '../src/adapter';
import AdUnit, { BannerAdUnit, InterstitialAdUnit } from '../src/adunit';
import { strategies } from '../src/Settings';
import { accountId, configId } from './config';

function getConnectiontype(type) {
  switch (type) {
    case 'wifi':
      return 2;
    default:
      return 0;
  }
}

export default class AdManager {
  getAds() {
    const adUnit1: AdUnit = new InterstitialAdUnit(
      'Interstitial',
      configId,
      1080,
      1920,
    );

    const adUnit2: AdUnit = new BannerAdUnit('Banner_320x50', configId);
    adUnit2.addSize(320, 50);

    const prebidAdapterFactory = (req: Request, resolve: () => mixed) => {
      const { height, width } = Dimensions.get('window');

      req.device()
        .make(DeviceInfo.getManufacturer())
        .model(DeviceInfo.getModel())
        .ua(DeviceInfo.getUserAgent())
        .w(width)
        .h(height)
        .pxratio(PixelRatio.get())
        .devtime(Date.now())
        .lmt(0)
        .ifa(DeviceInfo.getUniqueID())
        .os(DeviceInfo.getSystemName())
        .osv(DeviceInfo.getSystemVersion());

      req.app()
        .bundle(DeviceInfo.getBundleId())
        .ver(DeviceInfo.getVersion())
        .name('My Test App')
        .domain('test.com')
        .storeurl('https://play.google.com/ololo')
        .privacypolicy(0);

      req.user()
        .age(21)
        .gender('M')
        .language('EN');

      req.sdk()
        .source('prebid-react-native')
        .version('0.1.0')
        .platform('react-native');

      req
        .tid(uuid())
        .accountId(accountId);

      Promise.all([
        CarrierInfo.mobileNetworkOperator().then((mccmnc) => {
          req.device().mccmnc(mccmnc);
        }),

        CarrierInfo.carrierName().then((carrier) => {
          req.device().carrier(carrier);
        }),

        NetInfo.getConnectionInfo().then((connectiontype) => {
          req.device().connectiontype(getConnectiontype(connectiontype.type));
        }),
      ]).then(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const geo: Geo = new Geo()
            .lat(position.coords.latitude)
            .lon(position.coords.longitude)
            .accuracy(position.coords.accuracy)
            .lastfix(0);
          req.device().geo(geo);

          resolve();
        });
      }).catch((error) => {
        console.error(error);
      });
    };

    const prebidServerAdapter = new PrebidServerAdapter(
      accountId,
      10 * 1000,
      prebidAdapterFactory,
    );

    const onAuctionCallback = (auction) => {
      console.log(auction);
    };

    this.prebid = new Prebid({
      settings: {
        adRequestPeriod: 5 * 60 * 1000,
        adRequestTimeout: 6 * 1000,
        strategy: strategies.ON_EVERY_RESPONSE,
      },
      adUnits: [adUnit1, adUnit2],
      adapters: [prebidServerAdapter],
      callbacks: {
        onAuction: [onAuctionCallback],
      },
    });

    this.prebid.start();
  }
}

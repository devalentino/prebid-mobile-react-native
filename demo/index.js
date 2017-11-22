import { Dimensions, PixelRatio, NetInfo } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CarrierInfo from 'react-native-carrier-info';
import uuid from 'uuid/v4';
import Prebid from '../src/Prebid';
import Request, { Geo } from '../src/request';
import { PrebidServerAdapter } from '../src/adapter';
import AdUnit, { BannerAdUnit, InterstitialAdUnit } from '../src/adunit';
import { accountId, configId1 } from './config';

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
    const adUnitCallback = adUnit => console.log(adUnit);
    const adUnit1: AdUnit = new BannerAdUnit('Banner_320x50', configId1);
    adUnit1.addSize(320, 50);
    adUnit1.addResponseCallback(adUnitCallback);

    const adUnits: AdUnit[] = [
      adUnit1,
    ];

    const factory = (req: Request, doneCallback) => {
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

          doneCallback();
        });
      }).catch((error) => {
        console.error(error);
      });
    };

    const adapter = new PrebidServerAdapter(factory);
    this.prebid = new Prebid(adUnits, accountId)
      .registerAdapter(adapter)
      .period(5 * 1000)
      .start();
  }
}

import { Dimensions, PixelRatio, NetInfo } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import CarrierInfo from 'react-native-carrier-info';
import uuid from 'uuid/v4';
import Prebid from '../src/Prebid';
import Request, { Geo } from '../src/request';
import { PrebidServerAdapter } from '../src/adapter';
import AdUnit, { BannerAdUnit, InterstitialAdUnit } from '../src/adunit';

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
    const adUnit1: AdUnit = new BannerAdUnit('Banner_320x50', 'eebc307d-7f76-45d6-a7a7-68985169b138');
    adUnit1.addSize(320, 50);
    adUnit1.addResponseCallback(adUnitCallback);

    const adUnit2 = new BannerAdUnit('Banner_300x250', '0c286d00-b3ee-4550-b15d-f71f8e746865');
    adUnit2.addSize(320, 50);
    adUnit2.addResponseCallback(adUnitCallback);

    const adUnit3 = new InterstitialAdUnit('Interstitial_Ad_Unit_ID', 'eebc307d-7f76-45d6-a7a7-68985169b138');
    adUnit3.addResponseCallback(adUnitCallback);

    const adUnits: AdUnit[] = [
      adUnit1,
      adUnit2,
      adUnit3,
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
        .accountId('bfa84af2-bd16-4d35-96ad-31c6bb888df0');

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
      });
    };

    const adapter = new PrebidServerAdapter(factory);
    this.prebid = new Prebid(adUnits, 'myaccountid')
      .registerAdapter(adapter)
      .period(5 * 1000)
      .start();
  }
}

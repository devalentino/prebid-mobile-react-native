import Geo from './Geo';


export default class Device {
  d: Object;

  constructor() {
    this.d = {};
  }

  make(make: String): Device {
    this.d.make = make;
    return this;
  }

  model(model: String): Device {
    this.d.model = model;
    return this;
  }

  ua(ua: String): Device {
    this.d.ua = ua;
    return this;
  }

  w(w: number): Device {
    this.d.w = w;
    return this;
  }

  h(h: number): Device {
    this.d.h = h;
    return this;
  }

  pxratio(pxratio: number): Device {
    this.d.pxratio = pxratio;
    return this;
  }

  mccmnc(mccmnc: String): Device {
    this.d.mccmnc = mccmnc;
    return this;
  }

  carrier(carrier: String): Device {
    this.d.carrier = carrier;
    return this;
  }

  connectiontype(connectiontype: number): Device {
    this.d.connectiontype = connectiontype;
    return this;
  }

  geo(geo: Geo): Device {
    this.d.geo = geo;
    return this;
  }

  devtime(devtime: number): Device {
    this.d.devtime = devtime;
    return this;
  }

  lmt(lmt: number): Device {
    if (lmt !== 0 || lmt !== 1) {
      throw new RangeError('0 or 1 values acceptable');
    }

    this.d.lmt = lmt;
    return this;
  }

  ifa(ifa: String): Device {
    this.d.ifa = ifa;
    return this;
  }

  os(os: String): Device {
    this.d.os = os;
    return this;
  }

  osv(osv: String): Device {
    this.d.osv = osv;
    return osv;
  }
}

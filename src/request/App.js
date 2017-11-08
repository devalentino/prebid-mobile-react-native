export default class App {
  a: Object;

  constructor() {
    this.a = {};
  }

  bundle(bundle: String) {
    this.a.bundle = bundle;
    return this;
  }

  ver(ver: String) {
    this.a.ver = ver;
    return this;
  }

  name(name: String) {
    this.a.name = name;
    return this;
  }

  domain(domain: String) {
    this.a.domain = domain;
    return this;
  }

  storeurl(storeurl: String) {
    this.a.storeurl = storeurl;
    return this;
  }

  privacypolicy(privacypolicy: number) {
    this.a.privacypolicy = privacypolicy;
    return this;
  }
}

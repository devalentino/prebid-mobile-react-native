export default class App {
  a: Object;

  constructor() {
    this.a = {};
  }

  bundle(bundle: String): App {
    this.a.bundle = bundle;
    return this;
  }

  ver(ver: String): App {
    this.a.ver = ver;
    return this;
  }

  name(name: String): App {
    this.a.name = name;
    return this;
  }

  domain(domain: String): App {
    this.a.domain = domain;
    return this;
  }

  storeurl(storeurl: String): App {
    this.a.storeurl = storeurl;
    return this;
  }

  privacypolicy(privacypolicy: number): App {
    this.a.privacypolicy = privacypolicy;
    return this;
  }
}

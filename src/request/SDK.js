export default class SDK {
  s: Object;

  constructor() {
    this.s = {};
  }

  source(source: number): SDK {
    this.s.source = source;
    return this;
  }

  version(version: String): SDK {
    this.s.version = version;
    return this;
  }

  platform(platform: String): SDK {
    this.s.platform = platform;
    return this;
  }

  serialize() {
    return Object.assign({}, this.s);
  }
}

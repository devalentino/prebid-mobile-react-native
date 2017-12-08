export default class Geo {
  g: Object;

  constructor() {
    this.g = {};
  }

  lat(lat: number): Geo {
    this.g.lat = lat;
    return this;
  }

  lon(lon: number): Geo {
    this.g.lon = lon;
    return this;
  }

  lastfix(lastfix: number): Geo {
    this.g.lastfix = lastfix;
    return this;
  }

  accuracy(accuracy: number): Geo {
    this.g.accuracy = Math.round(accuracy);
    return this;
  }

  serialize() {
    return Object.assign({}, this.g);
  }
}

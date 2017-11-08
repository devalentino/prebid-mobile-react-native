export default class Geo {
  g: Object;

  constructor() {
    this.g = {};
  }

  lat(lat: number) {
    this.g.lat = lat;
    return this;
  }

  lon(lon: number) {
    this.g.lon = lon;
    return this;
  }

  lastfix(lastfix: number) {
    this.g.lastfix = lastfix;
    return this;
  }

  accuracy(accuracy: number) {
    this.g.accuracy = accuracy;
    return this;
  }
}

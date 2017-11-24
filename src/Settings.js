export const strategies: Object = {
  ON_FIRST_RESPONSE: 1,
  ON_ALL_RESPONSES: 2,
  ON_EVERY_RESPONSE: 3,
};

export default class Settings {
  adRequestPeriod: number;
  adRequestTimeout: number;
  strategy: number;

  constructor() {
    this.adRequestPeriod = 2 * 60 * 1000;
    this.adRequestTimeout = 5 * 1000;
    this.strategy = strategies.ON_ALL_RESPONSES;
  }
}

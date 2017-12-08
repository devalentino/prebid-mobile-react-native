export default class AdSize {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export const standardSizes = new Set();
standardSizes.add(new AdSize(300, 250));
standardSizes.add(new AdSize(300, 600));
standardSizes.add(new AdSize(320, 250));
standardSizes.add(new AdSize(254, 133));
standardSizes.add(new AdSize(580, 400));
standardSizes.add(new AdSize(320, 320));
standardSizes.add(new AdSize(320, 160));
standardSizes.add(new AdSize(320, 480));
standardSizes.add(new AdSize(336, 280));
standardSizes.add(new AdSize(320, 400));
standardSizes.add(new AdSize(1, 1));

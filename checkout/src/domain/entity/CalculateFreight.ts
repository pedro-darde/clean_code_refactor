import { Item } from "./Item";

export class CalculateFreight {
  private DEFAULT_DISTANCE = 1000;
  private MIN_FREIGTH = 10;

  constructor(readonly item: Item) { }

  getFreigth(distance: number = this.DEFAULT_DISTANCE) {
    const freightValue = this.calculateFreight(distance);
    if (freightValue > 0 && freightValue < this.MIN_FREIGTH) return this.MIN_FREIGTH
    return freightValue
  }

  private calculateFreight(distance: number) {
    const volume = this.item.getVolume();
    const density = this.item.getDensity() / 100;
    const freightValue = distance * volume * density;

    return freightValue;
  }
}

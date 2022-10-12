import { Item } from "./Item";

export class CalculateFreight {
  private DEFAULT_DISTANCE = 1000;
  private MIN_FREIGTH = 10;

  constructor(readonly item: Item) { }

  getFreigth() {
    const freightValue = this.calculateFreight();
    if (freightValue > 0 && freightValue < this.MIN_FREIGTH) return this.MIN_FREIGTH
    return freightValue
  }

  private calculateFreight() {
    const volume = this.item.getVolume();
    const density = this.item.getDensity() / 100;
    const freightValue = this.DEFAULT_DISTANCE * volume * density;

    return freightValue;
  }
}

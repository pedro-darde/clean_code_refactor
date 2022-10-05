import { Item } from "./Item";

export class CalculateFreight {
  DEFAULT_DISTANCE = 1000;
  MIN_FREIGTH = 10;

  constructor(readonly item: Item) {}

  getFreigth() {
    const freightValue = this.calculateFreight();
    return (freightValue < this.MIN_FREIGTH) ? this.MIN_FREIGTH : freightValue;
  }

  private calculateFreight() {
    const volume = this.item.getVolume();
    const density = this.item.getDensity() / 100;
    const freightValue = this.DEFAULT_DISTANCE * volume * density;

    return freightValue;
  }
}

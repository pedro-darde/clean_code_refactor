export class FreightCalculator {
  private DEFAULT_DISTANCE = 1000;
  private MIN_FREIGTH = 10;

  constructor(readonly volume: number, readonly density: number) { }

  getFreigth(distance: number = this.DEFAULT_DISTANCE) {
    const freightValue = this.calculateFreight(distance);
    if (freightValue > 0 && freightValue < this.MIN_FREIGTH) return this.MIN_FREIGTH
    return freightValue
  }

  private calculateFreight(distance: number) {
    const freightValue = distance * this.volume * (this.density / 1000);

    return freightValue;
  }
}

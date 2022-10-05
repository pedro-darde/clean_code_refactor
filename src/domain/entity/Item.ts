import { Dimension } from "./Dimension";

export class Item {
  constructor(
    readonly id: number,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension
  ) {}

  getVolume() {
    return this.dimension.getVolume();
  }

  getDensity() {
    return this.dimension.getDensity();
  }
}

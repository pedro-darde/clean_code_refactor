export class Dimension {
  constructor(
    readonly height: number,
    readonly width: number,
    readonly depth: number,
    readonly weigth: number
  ) {
    if (height < 0 || width < 0 || depth < 0 || weigth < 0) {
      throw new Error("As informações de dimensão não podem ser negativas.");
    }
  }

  getDensity() {
    if (this.getVolume() === 0) return 0;
    return this.weigth / this.getVolume();
  }

  getVolume() {
    return (this.height / 100) * (this.width / 100) * (this.depth / 100);
  }
}

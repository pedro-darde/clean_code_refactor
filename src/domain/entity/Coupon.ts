export class Coupon {
  constructor(
    readonly name: string,
    readonly percentage: number,
    readonly expiresIn?: Date
  ) {}

  calculateDiscount(total: number) {
    if (this.expiresIn && this.isExpired()) return 0;

    const percentage = this.percentage / 100;
    const valueToDiscount = total * percentage;
    return valueToDiscount;
  }

  private isExpired(now: number = Date.now()) {
    return !(now > this.expiresIn?.getTime()!);
  }
}

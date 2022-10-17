export class Coupon {
  constructor(
    readonly name: string,
    readonly percentage: number,
    readonly expiresIn?: Date
  ) {}

  calculateDiscount(total: number, now: Date = new Date()) {
    if (this.isExpired(now)) return 0;

    const percentage = this.percentage / 100;
    const valueToDiscount = total * percentage;
    return valueToDiscount;
  }

  isExpired(now: Date = new Date()) {
    return (this.expiresIn && this.expiresIn.getTime() < now.getTime())
  }
}

import { Coupon } from "../entity/Coupon";

export interface CouponRepository {
  findByCode(couponName: string): Promise<Coupon>;
}

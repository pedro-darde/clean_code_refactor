import { CouponRepository } from "../domain/repository/CouponRepository";

export class ValidateCoupon {
    constructor(readonly couponRepository: CouponRepository) { }

    async execute({ code, date }: Input): Promise<boolean> {
        const coupon = await this.couponRepository.findByCode(code)
        if (!coupon) return false;
        return !coupon.isExpired(date)
    }
}

type Input = {
    code: string,
    date?: Date
}
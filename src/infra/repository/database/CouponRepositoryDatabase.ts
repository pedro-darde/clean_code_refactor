import { Coupon } from "../../../domain/entity/Coupon";
import { CouponRepository } from "../../../domain/repository/CouponRepository";
import Connection from "../../database/Connection";

export class CuoponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(couponCode: string): Promise<Coupon> {
    const [couponData] = await this.connection.query(
      "SELECT * FROM coupon WHERE code = $1",
      [couponCode]
    );

    if (!couponData) throw new Error("Cupom de desconto inválido.");

    return new Coupon(
      couponData.code,
      couponData.percentage,
      new Date(couponData?.expire_date)
    );
  }
}

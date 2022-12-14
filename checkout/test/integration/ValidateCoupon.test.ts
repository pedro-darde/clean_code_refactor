import { ValidateCoupon } from "../../src/application/ValidateCoupon"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import { CuoponRepositoryDatabase } from "../../src/infra/repository/database/CouponRepositoryDatabase"

test('Deve validar um cupom de desconto', async () => {
    const pgAdapter = new PgPromiseAdapter()
    const couponRepository = new CuoponRepositoryDatabase(pgAdapter)
    const validateCoupon = new ValidateCoupon(couponRepository)
    const isValid = await validateCoupon.execute({ code: "VALE20", date: new Date(2022, 5, 5) })
    expect(isValid).toBeTruthy()
    await pgAdapter.close()
})
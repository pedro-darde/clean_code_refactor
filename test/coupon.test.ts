import { Coupon } from "../src/domain/entity/Coupon";

test("Deve criar um cupom desconto", () => {
  const coupon = new Coupon("VALE20", 20);
  expect(coupon.calculateDiscount(1000)).toBe(200);
});

test("Não deve aplicar desconto com cupom expirado", () => {
  const coupon = new Coupon("VALE20", 20, new Date(2021, 10, 10));
  expect(coupon.calculateDiscount(1000, new Date(2022, 10, 10))).toBe(0);
});

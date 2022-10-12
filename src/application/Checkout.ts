import { Coupon } from "../domain/entity/Coupon";
import { Order } from "../domain/entity/Order";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";

export class Checkout {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly cupomRepository: CouponRepository
  ) { }

  async execute(input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input?.date, nextSequence);

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }

    if (input.couponCode) {
      const couponData = await this.cupomRepository.findByCode(
        input.couponCode
      );
      if (couponData) order.addCoupon(couponData);
    }

    await this.orderRepository.save(order);
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  couponCode?: string;
  date?: Date;
};

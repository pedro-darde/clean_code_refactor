import { Order } from "../domain/entity/Order";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";

export class Checkout {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly cupomRepository: CouponRepository
  ) {}

  async execute(input: Input): Promise<void> {
    let sequence = await this.orderRepository.count();
    const order = new Order(input.cpf, input?.date, ++sequence);

    if (input.couponCode) {
      const couponData = await this.cupomRepository.findByCode(
        input.couponCode
      );

      order.addCoupon(
        couponData.name,
        couponData.percentage,
        couponData.expiresIn
      );
    }

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
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

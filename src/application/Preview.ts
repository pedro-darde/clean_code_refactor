import { Order } from "../domain/entity/Order";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";

export class Preview {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository
  ) { }

  async execute(input: Input): Promise<number> {
    if (input.date) {
      input.date = typeof input.date === 'string' ? new Date(input.date) : input.date
    }
    
    const order = new Order(input.cpf, input?.date);

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
    }

    if (input.couponCode) {
      const couponData = await this.couponRepository.findByCode(
        input.couponCode
      );
      if (couponData) order.addCoupon(couponData);
    }

    const total = order.getTotalValue();
    return total;
  }
}

type Input = {
  date?: Date;
  couponCode?: string;
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
};

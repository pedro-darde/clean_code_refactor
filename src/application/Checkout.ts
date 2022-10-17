import { Coupon } from "../domain/entity/Coupon";
import { Order } from "../domain/entity/Order";
import { RepositoryFactory } from "../domain/factory/RepositoryFactory";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";

export class Checkout {
  itemRepository: ItemRepository;
  orderRepository: OrderRepository;
  couponRepository: CouponRepository;
  constructor(
    repositoryFactory: RepositoryFactory
  ) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute(input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1
    const order = new Order(input.cpf, input?.date, nextSequence);

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

    await this.orderRepository.save(order);
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  couponCode?: string;
  date?: Date;
};

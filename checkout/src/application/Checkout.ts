import { CalculateFreight } from "../domain/entity/CalculateFreight";
import { Coupon } from "../domain/entity/Coupon";
import { Order } from "../domain/entity/Order";
import { RepositoryFactory } from "../domain/factory/RepositoryFactory";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import DecrementStockGateway from "./gateway/DecrementStockGateway";
import GetItemGateway from "./gateway/GetItemGateway";

export class Checkout {
  itemRepository: ItemRepository;
  orderRepository: OrderRepository;
  couponRepository: CouponRepository;
  constructor(
    repositoryFactory: RepositoryFactory,
    readonly getItemGateway: GetItemGateway,
    readonly calculateFreightGateway: CalculateFreightGateway,
    readonly decrementStockGateway: DecrementStockGateway,
  ) {
    this.itemRepository = repositoryFactory.createItemRepository()
    this.orderRepository = repositoryFactory.createOrderRepository()
    this.couponRepository = repositoryFactory.createCouponRepository()
  }

  async execute(input: Input): Promise<void> {
    const nextSequence = (await this.orderRepository.count()) + 1;
    const order = new Order(input.cpf, input.date, nextSequence);
    const orderItems = [];
    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity });
      await this.decrementStockGateway.execute(orderItem.idItem, orderItem.quantity)
    }
    order.freigth = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to);
    if (input.couponCode) {
      const coupon = await this.couponRepository.findByCode(input.couponCode);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order)
  }
}

type Input = {
  cpf: string;
  orderItems: { idItem: number; quantity: number }[];
  couponCode?: string;
  date?: Date;
  from?: string,
  to?: string
};

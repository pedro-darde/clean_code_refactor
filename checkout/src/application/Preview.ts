import { Order } from "../domain/entity/Order";
import { CouponRepository } from "../domain/repository/CouponRepository";
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import GetItemGateway from "./gateway/GetItemGateway";

export class Preview {
  constructor(
    readonly getItemGateway: GetItemGateway,
    readonly couponRepository: CouponRepository,
    readonly calculateFreightGateway: CalculateFreightGateway
  ) { }

  async execute(input: Input): Promise<number> {
    if (input.date) {
      input.date =
        typeof input.date === "string" ? new Date(input.date) : input.date;
    }

    const orderItems = []

    const order = new Order(input.cpf, input?.date);

    for (const orderItem of input.orderItems) {
      const item = await this.getItemGateway.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity })
    }
    order.freigth = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to)

    console.log(order.freigth)

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
  from?: string;
  to?: string;
};

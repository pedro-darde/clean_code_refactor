import { CalculateFreight } from "../domain/entity/CalculateFreight";
import { DistanceCalculator } from "../domain/entity/DistanceCalculator";
import { Order } from "../domain/entity/Order";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { ZipcodeRepository } from "../domain/repository/ZipcodeRepository";

export class Preview {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly couponRepository: CouponRepository,
    readonly zipcodeRepository: ZipcodeRepository
  ) {}

  async execute(input: Input): Promise<number> {
    if (input.date) {
      input.date =
        typeof input.date === "string" ? new Date(input.date) : input.date;
    }

    let distance;

    if (input.from && input.to) {
      const from = await this.zipcodeRepository.getByCode(input.from);
      const to = await this.zipcodeRepository.getByCode(input.to);
      distance = DistanceCalculator.calculate(to.coord, from.coord);
    }

    const order = new Order(input.cpf, input?.date);

    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem);
      order.addItem(item, orderItem.quantity);
      order.freigth +=
        new CalculateFreight(item).getFreigth(distance) * orderItem.quantity;
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
  from?: string;
  to?: string;
};

// this.freigth += new CalculateFreight(item).getFreigth();

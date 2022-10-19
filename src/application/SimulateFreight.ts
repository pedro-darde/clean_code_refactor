import { CalculateFreight } from "../domain/entity/CalculateFreight";
import { ItemRepository } from "../domain/repository/ItemRepository";

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) { }

  async execute(input: Input): Promise<Output> {
    let total = 0;

    for (const itemData of input.orderItems) {
      const item = await this.itemRepository.getItem(itemData.idItem);
      total += new CalculateFreight(item).getFreigth() * itemData.quantity;
    }

    return { total };
  }
}

type Input = {
  orderItems: { idItem: number; quantity: number }[];
  from?: string,
  to?: string
};

type Output = {
  total: number;
};

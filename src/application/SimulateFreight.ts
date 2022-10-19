import { CalculateFreight } from "../domain/entity/CalculateFreight";
import { Coord } from "../domain/entity/Coord";
import { DistanceCalculator } from "../domain/entity/DistanceCalculator";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { ZipcodeRepository } from "../domain/repository/ZipcodeRepository";

export class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository, readonly zipCodeRepository: ZipcodeRepository) { }

  async execute(input: Input): Promise<Output> {
    let total = 0;
    let distance;

    if (input.from && input.to) {
      const from = await this.zipCodeRepository.getByCode(input.from)
      const to = await this.zipCodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(to.coord, from.coord)
    }

    for (const itemData of input.orderItems) {
      const item = await this.itemRepository.getItem(itemData.idItem);
      total += new CalculateFreight(item).getFreigth(distance) * itemData.quantity;
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

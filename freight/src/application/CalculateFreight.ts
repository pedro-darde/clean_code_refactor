import { DistanceCalculator } from "../domain/entity/DistanceCalculator";
import { FreightCalculator } from "../domain/entity/FreightCalculator";
import { ZipcodeRepository } from "../domain/repository/ZipcodeRepository";

export class CalculateFreight {
  constructor(readonly zipCodeRepository: ZipcodeRepository) { }

  async execute(input: Input): Promise<Output> {
    let total = 0;
    let distance;
    if (input.from && input.to) {
      const from = await this.zipCodeRepository.getByCode(input.from)
      const to = await this.zipCodeRepository.getByCode(input.to)
      distance = DistanceCalculator.calculate(to.coord, from.coord)
    }
    for (const itemData of input.orderItems) {
      total += new FreightCalculator(itemData.volume, itemData.density).getFreigth(distance) * itemData.quantity;
    }

    return { total };
  }
}

type Input = {
  orderItems: { volume: number; density: number, quantity: number }[];
  from?: string,
  to?: string
};

type Output = {
  total: number;
};

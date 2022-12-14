import { ItemRepository } from "../domain/repository/ItemRepository";

export class GetIttem {
  constructor(readonly itemRepository: ItemRepository) { }

  async execute(idItem: number): Promise<Output> {
    const itemData = await this.itemRepository.getItem(idItem);
    return {
      idItem: itemData.id,
      description: itemData.description,
      price: itemData.price,
      volume: itemData.getVolume(),
      density: itemData.getDensity()
    }
  }
}


type Output = {
  idItem: number,
  description: string,
  price: number,
  volume: number,
  density: number
};

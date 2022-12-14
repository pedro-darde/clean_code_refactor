import { Item } from "../entity/Item";

export interface ItemRepository {
  getItem(idItem: number): Promise<Item>;
  save(item: Item): Promise<void>;
}

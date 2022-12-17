import { Dimension } from "../../../domain/entity/Dimension";
import { Item } from "../../../domain/entity/Item";
import { ItemRepository } from "../../../domain/repository/ItemRepository";
import Connection from "../../database/Connection";

export class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) { }

  async save(item: Item): Promise<void> {
    await this.connection.query(
      "INSERT INTO item values (description,price) VALUES $1,$2",
      []
    );
  }

  async getItem(idItem: number): Promise<Item> {
    const [itemData] = await this.connection.query(
      "SELECT * FROM public.item WHERE id_item = $1",
      [idItem]
    );

    return new Item(
      itemData.id_item,
      itemData.description,
      parseFloat(itemData.price),
      new Dimension(
        itemData.height,
        itemData.width,
        itemData.length,
        itemData.weigth
      )
    );
  }
}

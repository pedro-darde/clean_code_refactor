import { Preview } from "../src/application/Preview";
import { Dimension } from "../src/domain/entity/Dimension";
import { Item } from "../src/domain/entity/Item";
import { ItemRepositoryMemory } from "../src/infra/repository/memory/ItemRepositoryMemory";

test("Deve simular um pedido", async () => {
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(10, 10, 10, 10))
  );
  const preview = new Preview(itemRepository);

  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
  };

  const total = await preview.execute(input);
  expect(total).toBe(1100);
});

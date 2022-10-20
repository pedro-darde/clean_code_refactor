import { Preview } from "../src/application/Preview";
import { Dimension } from "../src/domain/entity/Dimension";
import { Item } from "../src/domain/entity/Item";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import { CuoponRepositoryDatabase } from "../src/infra/repository/database/CouponRepositoryDatabase";
import { ItemRepositoryMemory } from "../src/infra/repository/memory/ItemRepositoryMemory";

test("Deve simular um pedido", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const couponRepository = new CuoponRepositoryDatabase(pgAdapter);
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(10, 10, 10, 10))
  );
  const preview = new Preview(itemRepository, couponRepository);

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
  await couponRepository.connection.close();
});

test("Deve simular um pedido com desconto", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const couponRepository = new CuoponRepositoryDatabase(pgAdapter);
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(10, 10, 10, 10))
  );
  const preview = new Preview(itemRepository, couponRepository);

  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    date: new Date(2022, 8, 5),
    couponCode: "VALE20",
  };

  const total = await preview.execute(input);
  expect(total).toBe(900);
  await couponRepository.connection.close();
});

test("Deve simular um pedido com distância", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const couponRepository = new CuoponRepositoryDatabase(pgAdapter);
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(10, 10, 10, 10))
  );
  const preview = new Preview(itemRepository, couponRepository);

  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    date: new Date(2022, 8, 5),
    couponCode: "VALE20",
    to: "22060030",
    from: "88015600",
  };

  const total = await preview.execute(input);
  expect(total).toBe(900);
  await pgAdapter.close();
});

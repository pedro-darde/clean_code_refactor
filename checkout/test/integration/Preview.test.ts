import { Preview } from "../../src/application/Preview";
import { Dimension } from "../../src/domain/entity/Dimension";
import { Item } from "../../src/domain/entity/Item";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import calculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import { CuoponRepositoryDatabase } from "../../src/infra/repository/database/CouponRepositoryDatabase";
import { ItemRepositoryMemory } from "../../src/infra/repository/memory/ItemRepositoryMemory";
test("Deve simular um pedido com distância", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const couponRepository = new CuoponRepositoryDatabase(pgAdapter);
  const itemRepository = new ItemRepositoryMemory();
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(10, 10, 10, 10))
  );
  const calculateFreightGateway = new CalculateFreightHttpGateway()
  const preview = new Preview(itemRepository, couponRepository, calculateFreightGateway);

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
  expect(total).toBe(810);
  await pgAdapter.close();
});

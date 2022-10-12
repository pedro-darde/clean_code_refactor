import { SimulateFreight } from "../../src/application/SimulateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import { ItemRepositoryDatabase } from "../../src/infra/repository/database/ItemRepositoryDatabase";
test("Deve calcular o preço do frete com base nos itens do pedido", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const itemRepositoryDatabase = new ItemRepositoryDatabase(pgAdapter);
  const simulateFreigth = new SimulateFreight(itemRepositoryDatabase);

  const { total } = await simulateFreigth.execute({
    orderItems: [
      {
        idItem: 1,
        quantity: 2,
      },
    ],
  });


  expect(total).toBe(60);
  await pgAdapter.close();
});

import { SimulateFreight } from "../../src/application/SimulateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import { ItemRepositoryDatabase } from "../../src/infra/repository/database/ItemRepositoryDatabase";
import { ZipcodeRepositoryDatabase } from "../../src/infra/repository/database/ZipcodeRepositoryDatabse";
test("Deve calcular o preço do frete com base nos itens do pedido", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const itemRepositoryDatabase = new ItemRepositoryDatabase(pgAdapter);
  const zipCodeRepository = new ZipcodeRepositoryDatabase(pgAdapter);
  const simulateFreigth = new SimulateFreight(itemRepositoryDatabase, zipCodeRepository);

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


test("Deve simular o frete calculando a distancia", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const zipCodeRepository = new ZipcodeRepositoryDatabase(pgAdapter);
  const itemRepositoryDatabase = new ItemRepositoryDatabase(pgAdapter);
  const simulateFreigth = new SimulateFreight(itemRepositoryDatabase, zipCodeRepository);

  const { total } = await simulateFreigth.execute({
    orderItems: [
      {
        idItem: 1,
        quantity: 2,
      },
    ],
    from: '88015600',
    to: '22060030'
  });


  expect(total).toBe(44.893306680489786);
  await pgAdapter.close();
});
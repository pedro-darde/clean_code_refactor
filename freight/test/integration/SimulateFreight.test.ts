import { CalculateFreight } from "../../src/application/CalculateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import { ZipcodeRepositoryDatabase } from "../../src/infra/repository/database/ZipcodeRepositoryDatabse";
test("Deve calcular o preço do frete com base nos itens do pedido", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const zipCodeRepository = new ZipcodeRepositoryDatabase(pgAdapter);
  const simulateFreigth = new CalculateFreight(zipCodeRepository);

  const { total } = await simulateFreigth.execute({
    orderItems: [
      {
        volume: 0.03,
        density: 100,
        quantity: 1
      },
    ],
  });


  expect(total).toBe(60);
  await pgAdapter.close();
});


test("Deve simular o frete calculando a distancia", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const zipCodeRepository = new ZipcodeRepositoryDatabase(pgAdapter);
  const simulateFreigth = new CalculateFreight(zipCodeRepository);

  const { total } = await simulateFreigth.execute({
    orderItems: [
      {
        volume: 0.03,
        density: 100,
        quantity: 1
      },
    ],
    from: '88015600',
    to: '22060030'
  });


  expect(total).toBe(44.893306680489786);
  await pgAdapter.close();
});
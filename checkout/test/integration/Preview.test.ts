import { Preview } from "../../src/application/Preview";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";
import { CuoponRepositoryDatabase } from "../../src/infra/repository/database/CouponRepositoryDatabase";
test("Deve simular um pedido com distância", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const couponRepository = new CuoponRepositoryDatabase(pgAdapter);
  const calculateFreightGateway = new CalculateFreightHttpGateway()
  const getItemGateway = new GetItemHttpGateway()
  const preview = new Preview(getItemGateway, couponRepository, calculateFreightGateway);

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

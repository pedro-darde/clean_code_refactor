import { Checkout } from "../../src/application/Checkout";
import { GetOrdersByCpf } from "../../src/application/GetOrdersByCpf";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import { DatabaseRepositoryFactory } from "../../src/infra/factory/DatabaseRepositoryFactory";
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import DecrementStockHttpGateway from "../../src/infra/gateway/DecrementStockHttpGateway";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";
import { OrderRepositoryDatabase } from "../../src/infra/repository/database/OrderRepositoryDatabase";

test("Deve criar  um pedido", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const orderRepository = new OrderRepositoryDatabase(pgAdapter);
  const calculateFreightGateway = new CalculateFreightHttpGateway()
  const getItemGateway = new GetItemHttpGateway()
  const decrementStockGateway = new DecrementStockHttpGateway()
  await orderRepository.clear();
  const checkout = new Checkout(new DatabaseRepositoryFactory(pgAdapter), getItemGateway, calculateFreightGateway, decrementStockGateway);
  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    date: new Date(2023, 7, 5),
  };

  await checkout.execute(input);

  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);

  const orders = await getOrdersByCpf.execute(input.cpf);
  expect(orders[0].total).toBe(1010);
  expect(orders[0].code).toBe("202300000001");
  await pgAdapter.close();
});

test("Deve criar  um pedido com cupom de desconto", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const orderRepository = new OrderRepositoryDatabase(pgAdapter);
  await orderRepository.clear();

  const calculateFreightGateway = new CalculateFreightHttpGateway()
  const getItemGateway = new GetItemHttpGateway()
  const decrementStockGateway = new DecrementStockHttpGateway()
  const checkout = new Checkout(new DatabaseRepositoryFactory(pgAdapter), getItemGateway, calculateFreightGateway, decrementStockGateway);
  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    date: new Date(2023, 7, 5),
    couponCode: "VALE20",
  };

  await checkout.execute(input);

  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);

  const orders = await getOrdersByCpf.execute(input.cpf);
  expect(orders[0].total).toBe(1010);
  expect(orders[0].code).toBe("202300000001");
  await pgAdapter.close();
});

test("Deve criar  um pedido com cupom de desconto expirado", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const orderRepository = new OrderRepositoryDatabase(pgAdapter);

  await orderRepository.clear();
  const calculateFreightGateway = new CalculateFreightHttpGateway()
  const getItemGateway = new GetItemHttpGateway()
  const decrementStockGateway = new DecrementStockHttpGateway()
  const checkout = new Checkout(new DatabaseRepositoryFactory(pgAdapter), getItemGateway, calculateFreightGateway, decrementStockGateway);
  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    date: new Date(2022, 12, 6),
    couponCode: "VALE20",
  };

  await checkout.execute(input);

  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);

  const orders = await getOrdersByCpf.execute(input.cpf);
  expect(orders[0].total).toBe(1010);
  expect(orders[0].code).toBe("202300000001");
  await pgAdapter.close();
});

import { Checkout } from "../src/application/Checkout";
import { GetOrdersByCpf } from "../src/application/GetOrdersByCpf";
import { Dimension } from "../src/domain/entity/Dimension";
import { Item } from "../src/domain/entity/Item";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";
import { CuoponRepositoryDatabase } from "../src/infra/repository/database/CouponRepositoryDatabase";
import { ItemRepositoryMemory } from "../src/infra/repository/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../src/infra/repository/memory/OrderRepositoryMemory";

test("Deve criar  um pedido", async () => {
  const pgAdapter = new PgPromiseAdapter();
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CuoponRepositoryDatabase(pgAdapter);
  itemRepository.save(
    new Item(1, "Guitarra", 1000, new Dimension(10, 10, 10, 10))
  );
  const checkout = new Checkout(
    itemRepository,
    orderRepository,
    couponRepository
  );
  const input = {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    date: new Date(),
    couponCode: "VALE20"
  };

  await checkout.execute(input);

  const getOrdersByCpf = new GetOrdersByCpf(orderRepository);

  const orders = await getOrdersByCpf.execute(input.cpf);
  expect(orders[0].total).toBe(1100);
  expect(orders[0].code).toBe("202200000001");
});

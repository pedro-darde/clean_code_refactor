import { Checkout } from "./application/Checkout";
import { GetOrdersByCpf } from "./application/GetOrdersByCpf";
import { Preview } from "./application/Preview";
import OrderController from "./infra/controller/OrderController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import { CuoponRepositoryDatabase } from "./infra/repository/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "./infra/repository/database/ItemRepositoryDatabase";
import { OrderRepositoryMemory } from "./infra/repository/memory/OrderRepositoryMemory";

const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const couponRepository = new CuoponRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryMemory();
// itemRepository.save(new Item(1, "Guitarra", 1000));

const preview = new Preview(itemRepository);
const checkout = new Checkout(
  itemRepository,
  orderRepository,
  couponRepository
);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);

const httpServer = new ExpressAdapter();
new OrderController(httpServer, checkout, preview, getOrdersByCpf);
httpServer.listen(3001);

import { Checkout } from "./application/Checkout";
import { GetOrdersByCpf } from "./application/GetOrdersByCpf";
import { Preview } from "./application/Preview";
import OrderController from "./infra/controller/OrderController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import { DatabaseRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import { CuoponRepositoryDatabase } from "./infra/repository/database/CouponRepositoryDatabase";
import { ItemRepositoryDatabase } from "./infra/repository/database/ItemRepositoryDatabase";
import { ZipcodeRepositoryDatabase } from "./infra/repository/database/ZipcodeRepositoryDatabse";
import { OrderRepositoryMemory } from "./infra/repository/memory/OrderRepositoryMemory";

const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const couponRepository = new CuoponRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryMemory();
const zipCodeRepository = new ZipcodeRepositoryDatabase(connection)
// itemRepository.save(new Item(1, "Guitarra", 1000));

const preview = new Preview(itemRepository, couponRepository, zipCodeRepository);

const checkout = new Checkout(
  new DatabaseRepositoryFactory(connection)
);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);

const httpServer = new ExpressAdapter();
new OrderController(httpServer, checkout, preview, getOrdersByCpf);
httpServer.listen(3001);

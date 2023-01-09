import { Checkout } from "./application/Checkout";
import GetItemGateway from "./application/gateway/GetItemGateway";
import { GetOrdersByCpf } from "./application/GetOrdersByCpf";
import { Preview } from "./application/Preview";
import { SimulateFreight } from "./application/SimulateFreight";
import { Dimension } from "./domain/entity/Dimension";
import { Item } from "./domain/entity/Item";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import { DatabaseRepositoryFactory } from "./infra/factory/DatabaseRepositoryFactory";
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway";
import DecrementStockHttpGateway from "./infra/gateway/DecrementStockHttpGateway";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";
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
const calculateFreightGateway = new CalculateFreightHttpGateway()
const getItemGateway = new GetItemHttpGateway()
const decrementStockGateway = new DecrementStockHttpGateway()


const preview = new Preview(getItemGateway, couponRepository, calculateFreightGateway);

const checkout = new Checkout(
  new DatabaseRepositoryFactory(connection),
  getItemGateway,
  calculateFreightGateway,
  decrementStockGateway
);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
const simulateFreight = new SimulateFreight(itemRepository, zipCodeRepository)

const httpServer = new ExpressAdapter();
new RestController(httpServer, checkout, preview, getOrdersByCpf, simulateFreight);
httpServer.listen(3000);

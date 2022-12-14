import { CalculateFreight } from "./application/CalculateFreight";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import { ZipcodeRepositoryDatabase } from "./infra/repository/database/ZipcodeRepositoryDatabse";

const connection = new PgPromiseAdapter();
const zipCodeRepository = new ZipcodeRepositoryDatabase(connection)
const simulateFreight = new CalculateFreight(zipCodeRepository)
const httpServer = new ExpressAdapter();
new RestController(httpServer, simulateFreight);
httpServer.listen(3001);

import RestController from "./infra/controller/RestController";
import ExpressAdapter from "./infra/http/ExpressAdapter";

const httpServer = new ExpressAdapter();
new RestController(httpServer);
httpServer.listen(3003);

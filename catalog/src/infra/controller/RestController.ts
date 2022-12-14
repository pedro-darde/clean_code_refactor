import { GetIttem } from "../../application/GetItem";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly getItem: GetIttem,
  ) {
    httpServer.on("get", "/items/:idItem", async (params: any, body: any) => {
      console.log(params.idItem)
      const item = await getItem.execute(params.idItem);
      return item
    });
  }
}

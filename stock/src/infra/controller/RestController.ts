import DecrementStock from "../../application/DecrementStock";
import GetStock from "../../application/GetStock";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly decrementStock: DecrementStock,
    readonly getStock: GetStock
  ) {
    httpServer.on("post", "/decrementStock", async function (params: any, body: any) {
      await decrementStock.execute(body)
    })

    httpServer.on("get", "/getStock/:idItem", async function (params: any, body: any) {
      const { total } = await getStock.execute(params.idItem)
      return total
    })
  }
}

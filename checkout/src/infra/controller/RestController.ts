import { Checkout } from "../../application/Checkout";
import { GetOrdersByCpf } from "../../application/GetOrdersByCpf";
import { Preview } from "../../application/Preview";
import { SimulateFreight } from "../../application/SimulateFreight";
import HttpServer from "../http/HttpServer";

export default class RestController {
  constructor(
    readonly httpServer: HttpServer,
    readonly checkout: Checkout,
    readonly preview: Preview,
    readonly getOrdersByCpf: GetOrdersByCpf,
    readonly simulateFreight: SimulateFreight
  ) {
    httpServer.on("post", "/preview", async (params: any, body: any) => {
      const total = await preview.execute(body);
      return { total };
    });

    httpServer.on("post", "/checkout", async (params: any, body: any) => {
      await checkout.execute(body);
    });

    httpServer.on("post", "/orders/:cpf", async (params: any, body: any) => {
      const orders = await getOrdersByCpf.execute(params.cpf);
      return orders;
    });

    httpServer.on("post", "/simulateFreight", async function (params: any, body: any) {
      const freight = await simulateFreight.execute(body)
      return freight;
    });
  }
}

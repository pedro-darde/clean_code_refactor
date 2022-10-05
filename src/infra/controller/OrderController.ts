import { Checkout } from "../../application/Checkout";
import { GetOrdersByCpf } from "../../application/GetOrdersByCpf";
import { Preview } from "../../application/Preview";
import HttpServer from "../http/HttpServer";

export default class OrderController {
  constructor(
    readonly httpServer: HttpServer,
    readonly checkout: Checkout,
    readonly preview: Preview,
    readonly getOrdersByCpf: GetOrdersByCpf
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
  }
}

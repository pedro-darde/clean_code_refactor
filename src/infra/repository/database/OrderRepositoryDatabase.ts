import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [row] = await this.connection.query(
      "INSERT INTO public.order (coupon_code, coupon_percentage,code,cpf,issue_date, freight, sequence, total) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_order ",
      [
        order.coupon?.name ?? null,
        order.coupon?.percentage ?? null,
        order.getCode(),
        order.cpf.value,
        order.date,
        order.sequence,
        order.freigth,
        order.getTotalValue(),
      ]
    );
    for (const orderItem of order.getItens()) {
      await this.connection.query(
        "INSERT INTO public.order_item (id_item,quantity,price, id_order) VALUES ($1,$2,$3,$4)",
        [orderItem.idItem, orderItem.quantity, orderItem.price, row.id_order]
      );
    }
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    const ordersData = await this.connection.query(
      "SELECT * FROM public.order WHERE cpf = $1",
      [cpf]
    );
    console.log(ordersData);

    for (const order of ordersData) {
      console.log(order);
    }

    return [new Order("123123123123", new Date(), 1)];
  }

  async count(): Promise<number> {
    try {
      // const [row] = await this.connection.query(
      //   "SELECT COUNT(*)  FROM order",
      // []
      // );
      return 1;
    } catch (e) {
      console.log(e);
    }
    return 0;
  }
}

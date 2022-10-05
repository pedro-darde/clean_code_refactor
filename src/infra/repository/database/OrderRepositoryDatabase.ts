import { Order } from "../../../domain/entity/Order";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    await this.connection.query(
      "INSERT INTO order VALUES(coupon_code, coupon_percentage,code,cpf,issue_date, freight, sequence, total) values ($1,$2,$3,$4)",
      [
        order.coupon?.name,
        order.coupon?.percentage,
        order.getCode(),
        order.cpf.value,
        order.date,
        order.sequence,
        order.getTotalValue(),
      ]
    );

    for (const orderItem of order.getItens()) {
      await this.connection.query(
        "INSERT INTO order_item VALUES (id_item,quantity,price)",
        [orderItem.idItem, orderItem.quantity, orderItem.price]
      );
    }
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    return await this.connection.query("SELECT * FROM order WHERE cpf = $1", [
      cpf,
    ]);
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query(
      "select count(*)::int from order",
      []
    );
    return row.count;
  }
}

import { Coupon } from "../../../domain/entity/Coupon";
import { Dimension } from "../../../domain/entity/Dimension";
import { Item } from "../../../domain/entity/Item";
import { Order } from "../../../domain/entity/Order";
import { OrderCoupon } from "../../../domain/entity/OrderCoupon";
import { OrderItem } from "../../../domain/entity/OrderItem";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async save(order: Order): Promise<void> {
    const [{ id_order }] = await this.connection.query(
      "INSERT INTO public.order (code,cpf,issue_date, sequence,freight) VALUES ($1, $2, $3, $4, $5) RETURNING id_order",
      [
        order.getCode(),
        order.cpf.value,
        order.date,
        order.sequence,
        order.freigth,
      ]
    );

    for (const orderItem of order.getItens()) {
      await this.connection.query(
        "INSERT INTO public.order_item (id_item, id_order, price, quantity) VALUES ($1, $2, $3, $4)",
        [orderItem.idItem, id_order, orderItem.price, orderItem.quantity]
      );
    }
  }

  async getByCpf(cpf: string): Promise<Order[]> {
    const ordersData = await this.connection.query(
      "SELECT * FROM public.order WHERE cpf = $1",
      [cpf]
    );

    const orders: Order[] = [];
    for (const orderData of ordersData) {
      const order = new Order(
        orderData.cpf,
        orderData.issue_date,
        orderData.sequence
      );
      const orderItemsData = await this.connection.query(
        "SELECT * FROM public.order_item WHERE id_order = $1",
        [orderData.id_order]
      );
      for (const orderItemData of orderItemsData) {
        order.items.push(
          new OrderItem(
            orderItemData.id_item,
            parseFloat(orderItemData.price),
            orderItemData.quantity
          )
        );
      }
      if (orderData.coupon_code) {
        order.coupon = new OrderCoupon(
          orderData.coupon_code,
          orderData.coupon_percentage
        );
      }
      order.freigth = parseFloat(orderData.freight);
      orders.push(order);
    }

    return orders;
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query(
      "SELECT COUNT(*)::integer as count FROM public.order",
      []
    );
    return row.count;
  }

  async clear(): Promise<void> {
    await Promise.all([
      // this.connection.query("TRUNCATE public.order_item CASCADE", []),
      this.connection.query("TRUNCATE public.order CASCADE", []),
      // this.connection.query("TRUNCATE public.coupon CASCADE", []),
    ]);
  }
}

import { Coupon } from "../../../domain/entity/Coupon";
import { Dimension } from "../../../domain/entity/Dimension";
import { Item } from "../../../domain/entity/Item";
import { Order } from "../../../domain/entity/Order";
import { OrderCoupon } from "../../../domain/entity/OrderCoupon";
import { OrderItem } from "../../../domain/entity/OrderItem";
import { OrderRepository } from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) { }

  async save(order: Order): Promise<void> {
    throw new Error(`Not implemented`)
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
      const [orderItemSData] = await this.connection.query("SELECT * FROM public.order_item WHERE id_order = $1", [orderData.id_order])
      for (const orderItemData of orderItemSData) {
        order.items.push(new OrderItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity))
      }
      if (orderData.coupon_code) {
        order.coupon = new OrderCoupon(orderData.coupon_code, orderData.coupon_percentage)
      }
      order.freigth = parseFloat(orderData.freight)
      orders.push(order)
    }

    return orders;
  }

  async count(): Promise<number> {
    const [row] = await this.connection.query(
      "SELECT COUNT(*)  FROM public.order",
      []
    );
    return row.count;

  }

  async clear(): Promise<void> {
    await this.connection.query("TRUNCATE public.order_item CASCADE", []);
    await this.connection.query("TRUNCATE public.order CASCADE", []);
    await this.connection.query("TRUNCATE public.coupon CASCADE", [])
  }
}

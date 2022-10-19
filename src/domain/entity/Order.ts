import { CalculateFreight } from "./CalculateFreight";
import { Coupon } from "./Coupon";
import { CPF } from "./Cpf";
import { Item } from "./Item";
import { OrderCode } from "./OrderCode";
import { OrderItem } from "./OrderItem";

export class Order {
  cpf: CPF;
  items: OrderItem[];
  coupon?: Coupon;
  private orderCode: OrderCode;
  freigth = 0;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly sequence: number = 0
  ) {
    this.cpf = new CPF(cpf);
    this.items = [];
    this.orderCode = new OrderCode(date, sequence);
  }

  addItem(item: Item, quantity: number) {
    if (this.existsItem(item.id)) throw new Error("Item já informado.");
    this.items.push(new OrderItem(item.id, item.price, quantity));
    this.freigth += new CalculateFreight(item).getFreigth();
  }

  getItens() {
    return this.items;
  }

  getTotalValue() {
    let total = this.items.reduce((acc, orderItem) => {
      return (acc += orderItem.getTotal());
    }, 0.0);

    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date);
    }

    if (this.freigth) {
      total += this.freigth;
    }

    return total;
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getCode() {
    return this.orderCode.value;
  }

  private existsItem(id: number) {
    return ~this.items.findIndex((item) => item.idItem === id);
  }
}

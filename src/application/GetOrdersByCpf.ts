import { OrderRepository } from "../domain/repository/OrderRepository";

export class GetOrdersByCpf {
  constructor(readonly orderRepository: OrderRepository) {}

  async execute(cpf: string): Promise<Output[]> {
    const output: Output[] = [];
    const orders = await this.orderRepository.getByCpf(cpf);

    for (const order of orders) {
      output.push({ code: order.getCode(), total: order.getTotalValue() });
    }
    return output;
  }
}

type Output = {
  total: number;
  code: string;
};

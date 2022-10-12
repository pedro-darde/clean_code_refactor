import { CalculateFreight } from "../src/domain/entity/CalculateFreight";
import { Coupon } from "../src/domain/entity/Coupon";
import { Dimension } from "../src/domain/entity/Dimension";
import { Item } from "../src/domain/entity/Item";
import { Order } from "../src/domain/entity/Order";

const validCPF = "03433172064";
const validDimension = new Dimension(100, 50, 50, 5);
describe("Testes do Pedido", () => {
  test("Não deve criar um pedido com cpf inválido", () => {
    expect(() => new Order("1111111111")).toThrow(new Error("CPF Inválido"));
  });

  test("Deve criar 3 pedidos com preço,descrição e quantidade", () => {
    const order = new Order(validCPF);
    order.addItem(new Item(33, "Violão", 300, validDimension), 20);
    expect(order.getTotalValue()).toBe(6050);
  });

  test("Deve criar um pedido com cupom de desconto", () => {
    const orderWithDiscount = new Order(validCPF);
    orderWithDiscount.addItem(new Item(1, "Guitara", 1500, validDimension), 1);
    orderWithDiscount.addCoupon(
      new Coupon("VALE50", 50, new Date(2023, 8, 28))
    );
    expect(orderWithDiscount.getTotalValue()).toBe(800);
  });

  test("Não deve aplicar cupom de desconto expirado", () => {
    const order = new Order(validCPF);
    order.addItem(new Item(1, "Guitarra", 1500, validDimension), 1);
    order.addCoupon(new Coupon("VALE20", 20, new Date(2022, 8, 21)));
    expect(order.getTotalValue()).toBe(1550);
  });

  test("Não deve inserir os mesmos itens", () => {
    const order = new Order(validCPF);
    order.addItem(new Item(1, "Guitarra", 500, validDimension), 10);
    expect(() =>
      order.addItem(new Item(1, "Guitarra", 750, validDimension), 10)
    ).toThrow(new Error("Item já informado."));
  });

  test("O peso do item não pode ser negativo", () => {
    const order = new Order(validCPF);
    expect(() =>
      order.addItem(
        new Item(1, "Guitarra", 500, new Dimension(100, 50, 50, -5)),
        10
      )
    ).toThrow(new Error("As informações de dimensão não podem ser negativas."));
  });



  test("Deve gerar o código do pedido", () => {
    const order = new Order(validCPF, new Date(), 1);

    expect(order.getCode()).toBe("202200000001");
  });
});

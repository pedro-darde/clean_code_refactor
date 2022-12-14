import { OrderItem } from "../../src/domain/entity/OrderItem"

test('Deve criar um item do pedido', () => {
    const orderItem = new OrderItem(1, 50, 10)
    expect(orderItem.getTotal()).toBe(500)
})

test('Não deve criar item do pedido com quantidade negativa', () => {
    expect(() => new OrderItem(1, 10, -5)).toThrow('Quantidade não pode ser negativa')
})
import { CalculateFreight } from "../src/domain/entity/CalculateFreight"
import { Dimension } from "../src/domain/entity/Dimension"
import { Item } from "../src/domain/entity/Item"

test('Deve calcular o valor do frete com base nas dimensões do item', () => {
    // 100cm, 30cm, 10cm, 3kg
    const itemDimension = new Dimension(100, 30, 10, 3)
    const item = new Item(1, 'Guitarra', 2500, itemDimension)

    const freight = new CalculateFreight(item).getFreigth()
    expect(freight).toBe(30)
})

test("Deve retornar o preço mínimo de frete caso ele seja superior ao valor calculado", () => {
    const item = new Item(2, "Mouse", 200, new Dimension(5, 5, 5, 0.125));
    const calculateFreight = new CalculateFreight(item);
    expect(calculateFreight.getFreigth()).toBe(10);
});
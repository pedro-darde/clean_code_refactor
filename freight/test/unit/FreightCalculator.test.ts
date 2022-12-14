import { FreightCalculator } from "../../src/domain/entity/FreightCalculator";

test("Deve calcular o frete", function () {
    const freight = new FreightCalculator(0.03, 100).getFreigth();
    expect(freight).toBe(30);
});

test("Deve calcular o frete mínimo", function () {
    const freight = new FreightCalculator(0.001, 900).getFreigth();
    expect(freight).toBe(10);
});

test("Deve calcular o frete com distância", function () {
    const distance = 748.2217780081631;
    const freight = new FreightCalculator(0.03, 100).getFreigth(distance);
    expect(freight).toBe(22.446653340244893);
});
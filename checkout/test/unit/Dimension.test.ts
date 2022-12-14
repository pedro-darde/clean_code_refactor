import { Dimension } from "../../src/domain/entity/Dimension";

test('Deve calcular o volume', () => {
  const dimension = new Dimension(100, 30, 10, 3)

  expect(dimension.getVolume()).toBe(0.03)
})

test("Nenhuma dimensão pode ser negativa", () => {
  expect(() => new Dimension(-10, 10, 10, 5)).toThrow(
    new Error("As informações de dimensão não podem ser negativas.")
  );
});



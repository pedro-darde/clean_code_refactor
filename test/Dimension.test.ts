import { Dimension } from "../src/domain/entity/Dimension";

test("Nenhuma dimensão pode ser negativa", () => {
  expect(() => new Dimension(-10, 10, 10, 5)).toThrow(
    new Error("As informações de dimensão não podem ser negativas.")
  );
});

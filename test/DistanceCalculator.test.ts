import { Coord } from "../src/domain/entity/Coord";
import { DistanceCalculator } from "../src/domain/entity/DistanceCalculator";

test("Deve calcular a distância entre 2 coordenadas", () => {
  const coord1 = new Coord(-27.5945, -48.5477);
  const coord2 = new Coord(-22.9129, -43.2003);
  const distance = DistanceCalculator.calculate(coord1, coord2);
  expect(distance.toFixed(2)).toBe("748.22");
});

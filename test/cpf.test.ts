import { CPF } from "../src/domain/entity/Cpf";

test("Deve ser inválido se não for informado um Cpf", () => {
  expect(() => new CPF("")).toThrow(new Error("CPF Inválido"));
});

test("Deve ser inválido se o tamanho for menor que 11", () => {
  expect(() => new CPF("1")).toThrow(new Error("CPF Inválido"));
});

test("Deve ser inválido se o tamanho for maior que 14", () => {
  expect(() => new CPF("034331720644")).toThrow(new Error("CPF Inválido"));
});

test("Não pode conter os mesmos caractéres no CPF", () => {
  expect(() => new CPF("11111111111")).toThrow(new Error("CPF Inválido"));
});

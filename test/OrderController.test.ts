import axios from "axios";

test("Deve testar o preview pela API", async () => {
  const response = await axios.post("http://localhost:3001/preview", {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
  });

  const preview = response.data;
  expect(preview.total).toBe(1030);
});

test("Deve testar o preview com desconto pela API", async () => {
  const response = await axios.post("http://localhost:3001/preview", {
    cpf: "03433172064",
    orderItems: [
      {
        idItem: 1,
        quantity: 1,
      },
    ],
    couponCode: "VALE50",
  });

  const preview = response.data;
  expect(preview.total).toBe(830);
});

import axios from "axios";


test("Deve ttestar o simulate freight pela API", async function () {
  const input = {
    orderItems: [
      { idItem: 1, quantity: 1, density: 100 }
    ]
  }
  const response = await axios.post("http://localhost:3000/simulateFreight", input)
  const freight = response.data?.total
  expect(freight).toBe(30)
})

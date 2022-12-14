import axios from "axios";
import CalculateFreightGateway from "../../application/gateway/CalculateFreightGateway";

export default class CalculateFreightHttpGateway implements CalculateFreightGateway {
    async calculate(orderItems: { volume: number, density: number, quantity: number }[], from?: string, to?: string): Promise<number> {
        const { data } = await axios.post("http://localhost:3001/calculateFreight", { orderItems, from, to })
        return data.total
    }
}
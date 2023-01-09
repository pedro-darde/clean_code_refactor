import axios from "axios";
import CalculateFreightGateway from "../../application/gateway/CalculateFreightGateway";
import DecrementStockGateway from "../../application/gateway/DecrementStockGateway";

export default class DecrementStockHttpGateway implements DecrementStockGateway {
    async execute(idItem: number, quantity: number): Promise<void> {
        await axios.post("http://localhost:3003/decrementStock", { idItem, quantity })
    }
}
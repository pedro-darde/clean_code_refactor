import StockEntry from "../../../domain/entity/StockEntry";
import StockRepository from "../../../domain/repository/StockRepository";

export default class StockRepositoryMemory implements StockRepository {
    entries: StockEntry[]

    constructor() {
        this.entries = []
    }

    async getStockEntries(idItem: number): Promise<StockEntry[]> {
        return this.entries.filter(entry => entry.idItem === idItem)
    }
    async save(stockEntry: StockEntry): Promise<void> {
        this.entries.push(stockEntry)
    }
    async clear() {
        this.entries = []
    }
}
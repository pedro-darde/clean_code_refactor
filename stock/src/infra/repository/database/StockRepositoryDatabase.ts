import StockEntry from "../../../domain/entity/StockEntry";
import StockRepository from "../../../domain/repository/StockRepository";
import Connection from "../../database/Connection";

export default class StockRepositoryDatabase implements StockRepository {
    constructor(readonly connection: Connection) { }
    async getStockEntries(idItem: number): Promise<StockEntry[]> {
        const stockEntriesData = await this.connection.query("SELECT * FROM public.stock_entry where id_item = $1", [idItem])
        const entries: StockEntry[] = []
        for (const stockEntryData of stockEntriesData) {
            entries.push(new StockEntry(idItem, stockEntryData.operation, stockEntryData.quantity))
        }
        return entries
    }
    async save(stockEntry: StockEntry): Promise<void> {
        await this.connection.query("INSERT INTO public.stock_entry (id_item, operation, quantity) VALUES ($1,$2,$3)",
            [stockEntry.idItem, stockEntry.operation, stockEntry.quantity]
        )
    }
    async clear() {
        await this.connection.query("DELETE FROM public.stock_entry", [])
    }
}
import StockEntry from "./StockEntry";

export default class StockCalculator {
    static calculate(stockEntries: StockEntry[]) {
        return stockEntries.reduce((previous, acc) => {
            if (acc.operation === "out") {
                previous -= acc.quantity
            } else {
                previous += acc.quantity
            }
            return previous
        }, 0)
    }
}
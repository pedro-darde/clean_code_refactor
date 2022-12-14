export default interface CalculateFreightGateway {
    calculate(orderIttems: { volume: number, density: number, quantity: number }[], from?: string, to?: string): Promise<number>
}
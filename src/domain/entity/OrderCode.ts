export class OrderCode {
  value: string;
  constructor(date: Date, sequence: number) {
    this.value = this.createCode(date, sequence);
  }

  private createCode(date: Date, sequence: number) {
    return `${date.getFullYear()}${new String(sequence).padStart(8, "0")}`;
  }
}

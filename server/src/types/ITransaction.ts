export interface ITransaction extends Document {
  ticker: string;
  date: Date;
  transaction: "buy" | "sell";
  shares: number;
  stockPrice: number;
  taxes?: number;
}

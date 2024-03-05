export interface IStock extends Document {
  ticker: string;
  date: Date;
  buySell: 'buy' | 'sell';
  shares: number;
  price: number;
  tactical?: string;
}
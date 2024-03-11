export interface ITransaction {
  date: Date;
  transaction: 'buy' | 'sell';
  ticker: string;
  shares: number;
  price: number;
  taxes: number;
}
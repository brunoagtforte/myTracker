import { model, Schema, Document } from 'mongoose'

interface ITrade extends Document {
  ticker: string;
  date: Date;
  buySell: 'buy' | 'sell';
  shares: number;
  price: number;
  tactical?: string;
}

const tradeSchema = new Schema(
  {
    ticker: {
      type: String,
      requided: [true, "Ticker symbol is required"],
      minLength: [1, "Ticker symbol must be at least character"],
      maxLength: [5, "Ticker symbol cannot be more than 5 characters"]
    },
    date: {
      type: Date,
      required: [true]
    },
    buySell: {
      type: String,
      required: [true],
      enum: ["buy", "sell"]
    },
    shares: {
      type: Number,
      required: [true, "Number of shares required"],
      min: [1, "Must be at least 1 share"]
    },
    price: {
      type: Number,
      required: [true, "Price required"]
    },
    tactical: {
      type: String,
      required: [false],
      maxlength: [50, "cannot be longer than 50 characters"]
    }
  },
  {
    timestamps: true
  }
);

const Trade = model<ITrade>("Trade", tradeSchema);

export { Trade as default, ITrade };
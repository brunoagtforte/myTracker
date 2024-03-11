import { model, Schema } from 'mongoose'
import { ITransaction } from '../types/ITransaction';

const tradeSchema = new Schema<ITransaction>(
  {
    ticker: {
      type: String,
      requided: [true, "Ticker symbol is required"],
      minLength: [1, "Ticker symbol must be at least character"],
      maxLength: [5, "Ticker symbol cannot be more than 5 characters"]
    },
    date: {
      type: Date,
      default: new Date(),
      required: true
    },
    transaction: {
      type: String,
      required: true,
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
    taxes: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Trade = model<ITransaction>("Trade", tradeSchema);

export default Trade
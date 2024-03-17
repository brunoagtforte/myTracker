import { model, Schema } from "mongoose";
import { ITransaction } from "../types/ITransaction";

const tradeSchema = new Schema<ITransaction>(
  {
    ticker: {
      type: String,
      required: [true, "Ticker symbol is required"],
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Date required"],
    },
    transaction: {
      type: String,
      required: [true, "Transaction type required"],
      enum: ["buy", "sell"],
    },
    shares: {
      type: Number,
      required: [true, "Number of shares required"],
    },
    stockPrice: {
      type: Number,
      required: [true, "Stock Price required"],
    },
    taxes: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true, // Adiciona campos de timestamp automaticamente
  }
);

const Trade = model<ITransaction>("Trade", tradeSchema);

export default Trade;

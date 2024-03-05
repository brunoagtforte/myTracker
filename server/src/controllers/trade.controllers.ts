import { Response, Request } from 'express'
import Trade from "../models/trade.model";
import { IStock } from '../../../shared/interfaces/interfaces';


const createTrade = async (req: Request, res: Response) => {
  try {
    const newTrade: IStock = await Trade.create(req.body);
    res.status(201).json(newTrade);
    res.json(newTrade);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create trade" });
  }
};

const getAllTrades = async (req: Request, res: Response) => {
  try {
    const allTrades: IStock[] = await Trade.find();
    res.json(allTrades)
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve trades" });
  }
}

const getOneTrade = async (req: Request, res: Response) => {
  try {
    const trade: IStock | null = await Trade.findById(req.params.id);
    if (!trade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    res.json(trade);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve trade" });
  }
}

const updateTrade = async (req: Request, res: Response) => {
  const options = {
    new: true,
    runValidators: true
  }
  try {
    const updatedTrade: IStock | null = await Trade.findByIdAndUpdate(req.params.id, req.body, options)
    if (!updatedTrade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    res.json(updatedTrade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update trade" });
  }
}

const deleteTrade = async (req: Request, res: Response) => {
  try {
    const deletedTrade: IStock | null = await Trade.findByIdAndDelete(req.params.id);
    if (!deletedTrade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    res.json(deletedTrade);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete trade" });
  }
}

export const TradeController = {
  createTrade,
  getAllTrades,
  getOneTrade,
  updateTrade,
  deleteTrade
}
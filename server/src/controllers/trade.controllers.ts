import { Request, Response } from "express";
import Trade from "../models/trade.model";
import { ITransaction } from "../types/ITransaction";

// Cria um novo trade
const createTrade = async (req: Request, res: Response) => {
  try {
    const newTrade: ITransaction = await Trade.create(req.body);
    res.status(201).json(newTrade);
  } catch (error) {
    console.error("Failed to create trade:", error);
    res.status(400).json({ error: "Failed to create trade" });
  }
};

// Obtém todos os trades
const getAllTrades = async (req: Request, res: Response) => {
  try {
    const allTrades: ITransaction[] = await Trade.find();
    res.json(allTrades);
  } catch (error) {
    console.error("Failed to retrieve trades:", error);
    res.status(500).json({ error: "Failed to retrieve trades" });
  }
};

// Obtém um trade por ID
const getOneTrade = async (req: Request, res: Response) => {
  try {
    const trade: ITransaction | null = await Trade.findById(req.params.id);
    if (!trade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    res.json(trade);
  } catch (error) {
    console.error("Failed to retrieve trade:", error);
    res.status(500).json({ error: "Failed to retrieve trade" });
  }
};

// Atualiza um trade por ID
const updateTrade = async (req: Request, res: Response) => {
  try {
    const updatedTrade: ITransaction | null = await Trade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTrade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    res.json(updatedTrade);
  } catch (error) {
    console.error("Failed to update trade:", error);
    res.status(500).json({ error: "Failed to update trade" });
  }
};

// Deleta um trade por ID
const deleteTrade = async (req: Request, res: Response) => {
  try {
    const deletedTrade: ITransaction | null = await Trade.findByIdAndDelete(
      req.params.id
    );
    if (!deletedTrade) {
      res.status(404).json({ error: "Trade not found" });
      return;
    }
    res.json(deletedTrade);
  } catch (error) {
    console.error("Failed to delete trade:", error);
    res.status(500).json({ error: "Failed to delete trade" });
  }
};

const tradeController = {
  createTrade,
  getAllTrades,
  getOneTrade,
  updateTrade,
  deleteTrade,
};

export default tradeController;

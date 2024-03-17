import { Router } from "express";
import TradeController from "../controllers/trade.controllers";

const router = Router();

router.route("/trades/add").post(TradeController.createTrade);
router.route("/trades").get(TradeController.getAllTrades);
router
  .route("/trades/:id")
  .get(TradeController.getOneTrade)
  .put(TradeController.updateTrade)
  .delete(TradeController.deleteTrade);

export default router;

import express from "express";

import {addTransaction, deleteTransaction, getTransactionByUserId, getTransactionSummaryById,getAllTransactions} from "../controllers/transactions_controller.js";

const router = express.Router();

router.get("/summary/:userId",getTransactionSummaryById);

router.get("/:userId", getTransactionByUserId);

router.post("/add", addTransaction);

router.get("/", getAllTransactions);

router.delete("/:id", deleteTransaction);

export default router;

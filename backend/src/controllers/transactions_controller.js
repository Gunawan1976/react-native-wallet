import { sql } from "../config/db.js";
import { errorResponse, successResponse } from "../../utils/response.js";

export async function getTransactionByUserId(req, res) {
  const { userId } = req.params;
  try {
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;

    successResponse(
      res,
      200,
      "Transactions fetched successfully",
      transactions
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    errorResponse(
      res,
      500,
      "Failed to fetch transactions",
      error.message || error
    );
  }
}

export async function addTransaction(req, res) {
  try {
    const { user_id, title, amount, category } = req.body;
    if (!title || !user_id || !category || amount === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transaction = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
      `;
    console.log(transaction);
    successResponse(res, 201, "Transaction added successfully", transaction[0]);
  } catch (error) {
    console.error("Error inserting transaction:", error);
    errorResponse(
      res,
      500,
      "Failed to insert transaction",
      error.message || error
    );
  }
}

export async function deleteTransaction(req, res) {
  const { id } = req.params;
  try {
    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;
    if (result.length === 0) {
      return errorResponse(res, 404, "Transaction not found");
    }
    successResponse(res, 200, "Transaction deleted", result[0]);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    errorResponse(
      res,
      500,
      "Failed to delete transaction",
      error.message || error
    );
  }
}

export async function getTransactionSummaryById (req, res) {
  const { userId } = req.params;
  try {
    const balanceResult = await sql`
        SELECT 
          COALESCE(SUM(amount), 0) AS balance
        FROM transactions
        WHERE user_id = ${userId}
      `;

    const incomeResult = await sql`
        SELECT 
            COALESCE(SUM(amount), 0) AS income
        FROM transactions
        WHERE user_id = ${userId} AND amount > 0
      `;

    const expenseResult = await sql`
            SELECT
                COALESCE(SUM(amount), 0) AS expenses
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0
        `;

    const summary = {
      balance: parseFloat(balanceResult[0].balance),
      income: parseFloat(incomeResult[0].income),
      expenses: parseFloat(expenseResult[0].expense),
    };

    successResponse(res, 200, "Summary fetched successfully", summary);
  } catch (error) {
    console.error("Error fetching summary:", error);
    errorResponse(res, 500, "Failed to fetch summary", error.message || error);
  }
};

export async function getAllTransactions (req, res){
  try {
    const result = await sql`SELECT * FROM transactions`;
    // console.log("All transactions:", result); // debug
    successResponse(res, 200, "All transactions fetched successfully", result);
  } catch (error) {
    console.error("Error testing database connection:", error);
    errorResponse(
      res,
      500,
      "Database connection test failed",
      error.message || error
    );
  }
}

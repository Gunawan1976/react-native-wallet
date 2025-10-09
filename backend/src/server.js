import "dotenv/config"; // ini HARUS di paling atas biar .env kebaca dulu
import express from "express";
import { initDB } from "./config/db.js";
import rateLimiterMiddleware from "./middleware/rate_limiter.js";

import transactionsRoute from "./routes/transactions_route.js";

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(rateLimiterMiddleware);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/transactions", transactionsRoute);

// Start server setelah DB siap

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

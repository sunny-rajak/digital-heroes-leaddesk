import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Forces Node.js to bypass system DNS and use Cloudflare/Google

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import leadRoutes from "./routes/leadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/leads", leadRoutes);
app.use("/api/admin", adminRoutes);

// Health check endpoint for deployment validation
app.get("/health", (req, res) => {
  res.status(200).json({ status: "API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { loadCjToken } from "./controllers/authController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Prisijungta prie MOngoDB");

    app.listen(PORT, async () => {
      console.log(`Serveris paleistas: http://localhost:${PORT}`);

      const token = await loadCjToken();
      console.log("gautas token: " + token.slice(0, 10));
    });
  })
  .catch((err) => {
    console.error("klaida jungiantis prie duomenų bazes:", err.message);
  });

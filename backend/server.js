import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import orderRouter from "./routers/orderRouter.js";
import productRouter from "./routers/productRouter.js";
import uploadRouter from "./routers/uploadRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();
connectDB();
const app = express();

app.use(cookieParser());
// app.use(cors());
const corsOptions = {
  origin: "http://localhost:5173", // Allow only the frontend origin
  credentials: true, // Allow credentials (cookies)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type", // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/uploads", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(5000, (req, res) => console.log("Server is Running..."));

//Backend/src/app.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import todo routes
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// user routes
app.use("/api/users", userRouter);

// product routes
app.use("/api", productRouter);

export { app };

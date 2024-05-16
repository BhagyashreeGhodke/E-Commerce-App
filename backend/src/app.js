//Backend/src/app.js

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import todo routes
import router from "./routes/routes.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Use todo routes
app.use("/api/users", router);

export { app };

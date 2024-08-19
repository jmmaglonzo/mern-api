import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./src/routes/route";
import routeHandler from "./src/middleware/routeHandler";
import errorHandler from "./src/middleware/errorHandler";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const isDevelopment = process.env.NODE_ENV === "development";

const corsOptions = {
  origin: isDevelopment
    ? `http://localhost:5173`
    : process.env.PRODUCTION_CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/user", userRouter);

app.all("*", routeHandler);
app.use(errorHandler);

export default app;

import express from "express";
import cors from "cors";
import userRouter from "./routes/user";

const app = express();

// global middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRouter);

export default app;

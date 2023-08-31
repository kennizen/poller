import express from "express";
import cors from "cors";
import userRouter from "./routes/user";
import pollRouter from "./routes/poll";
import pollOptionRouter from "./routes/poll_option";

const app = express();

// global middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/user", userRouter);
app.use("/poll", pollRouter);
app.use("/poll-option", pollOptionRouter);

export default app;

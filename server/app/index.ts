import express from "express";
import cors from "cors";
import router from "./routes/route";

const app = express();

// global middlewares 
app.use(cors());

// routes
app.use("/", router);

export default app;

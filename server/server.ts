import dotenv from "dotenv";
import app from "./app";
import { Pool } from "pg";

dotenv.config();

const port = process.env.PORT || 8000;
export const pool = new Pool({
  user: "postgres",
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "pollerDb",
});

pool.on("error", (err) => console.log("error connecting to postgres", err));
pool.on("connect", () => console.log("connected to postgres"));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

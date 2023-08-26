import dotenv from "dotenv";
import app from "./app";
import { Pool } from "pg";

dotenv.config();

const port = process.env.PORT || 8000;
export const pool = new Pool({
  user: "prach123",
  password: process.env.DB_PASSWORD_ONLINE,
  host: "dpg-cjkqko0cfp5c73bv6eog-a.singapore-postgres.render.com",
  port: 5432,
  database: "pollerdb",
});

pool.on("error", (err) => console.log("error connecting to postgres", err));
pool.on("connect", () => console.log("connected to postgres"));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

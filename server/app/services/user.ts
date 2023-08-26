import { pool } from "../../server";
import { DefaultAPIError } from "../../errors/ApiError";
import { UserInfo } from "../controllers/user";
import { DefaultAPISuccess } from "../../success/ApiSuccess";
import { genSalt, hash } from "bcrypt";

export async function addUserService({ email, password, username, avatar }: UserInfo) {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (user.rows.length > 0) {
    throw new DefaultAPIError(409, "user already exists");
  }



  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const resUser = await pool.query(
    "INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING user_id",
    [username, email, hashedPassword, avatar ?? ""]
  );

  return new DefaultAPISuccess<string>(201, "User created", resUser.rows[0].user_id as string);
}


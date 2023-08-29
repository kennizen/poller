import { pool } from "../../server";
import { DefaultAPIError } from "../../errors/ApiError";
import { IUserLoginInfo, IUserRegistrationInfo } from "../controllers/user";
import { DefaultAPISuccess } from "../../success/ApiSuccess";
import { compare, genSalt, hash } from "bcrypt";
import { AES, enc } from "crypto-js";
import JWTAuth from "../../lib/JWTAuth";

export type UserDataInJWT = {
  userId: string;
};

// user sign up
export async function registerUserService({
  email,
  password,
  username,
  avatar,
}: IUserRegistrationInfo) {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (user.rows.length > 0) {
    throw new DefaultAPIError(409, "user already exists");
  }

  // const decryptedPassword = AES.decrypt(password, process.env.CRYPTO_SECRET).toString(enc.Utf8);
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);

  const resUser = await pool.query(
    "INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, $4) RETURNING user_id",
    [username, email, hashedPassword, avatar ?? null]
  );

  const token = new JWTAuth<UserDataInJWT>().encode({
    userId: resUser.rows[0].user_id,
  });

  return new DefaultAPISuccess<string>(201, "User created", token);
}

// user login
export async function loginUserService({ email, password }: IUserLoginInfo) {
  const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

  if (user.rows.length <= 0) {
    throw new DefaultAPIError(401, "email id not found");
  }

  // const decryptedPassword = AES.decrypt(password, process.env.CRYPTO_SECRET).toString(enc.Utf8);
  const isPasswordValid = await compare(password, user.rows[0].password);

  if (!isPasswordValid) {
    throw new DefaultAPIError(401, "invalid password");
  }

  const token = new JWTAuth<UserDataInJWT>().encode({
    userId: user.rows[0].user_id,
  });

  return new DefaultAPISuccess<string>(200, "login successfull", token);
}

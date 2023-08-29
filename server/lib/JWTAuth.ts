import { sign, verify } from "jsonwebtoken";
import { intoResult } from "../hof/result";

export default class JWTAuth<T extends string | object> {
  encode(data: T) {
    return sign(data, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  decode(token: string) {
    const [result, error] = intoResult<typeof verify>(verify, token, process.env.JWT_SECRET);
    if (error) return null;
    return result as unknown as T;
  }
}

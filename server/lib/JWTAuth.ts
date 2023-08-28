import { sign } from "jsonwebtoken";

export default class JWTAuth<T extends string | object> {
  encode(data: T) {
    return sign(data, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  decode() {
    return ;
  }
}

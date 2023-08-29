import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import JWTAuth from "../../lib/JWTAuth";
import { InputType } from "../../utils/typeUtils";
import { UserDataInJWT } from "../services/user";

export function authorize(...[req, res, next]: InputType<any>) {
  const header = req.headers["authorization"];

  if (header === undefined) {
    return sendErrorResponse(res, new DefaultAPIError(401, "No authorization header"));
  }

  const token = header.split(" ")[1];

  if (token === undefined || token === null) {
    return sendErrorResponse(res, new DefaultAPIError(401, "No token found"));
  }

  const user = new JWTAuth<UserDataInJWT>().decode(token);

  if (user === null) {
    return sendErrorResponse(res, new DefaultAPIError(401, "Invalid token"));
  }

  req.body.userId = user.userId;

  next();
}

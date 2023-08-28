import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import { InputType } from "../../utils/typeUtils";
import { UserLoginInfo } from "../controllers/user";

export default function validUserInfo(...[req, res, next]: InputType<UserLoginInfo>) {
  const { email } = req.body;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email.match(regex) === null) {
    return sendErrorResponse(res, new DefaultAPIError(401, "invalid email"));
  }

  next();
}

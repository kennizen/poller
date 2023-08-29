import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import { InputType } from "../../utils/typeUtils";

export function passwordValidator(...[req, res, next]: InputType<{ password: string }>) {
  const { password } = req.body;

  if (password.length < 4) {
    return sendErrorResponse(
      res,
      new DefaultAPIError(401, "Password too small. Length must be atleast 4")
    );
  }

  next();
}

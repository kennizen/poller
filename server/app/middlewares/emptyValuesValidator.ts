import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import { InputType } from "../../utils/typeUtils";

export function emptyValuesValidator(...[req, res, next]: InputType<Record<string, any>>) {
  const obj = req.body;

  if (Object.values(obj).some((val) => val === undefined || val === null)) {
    return sendErrorResponse(
      res,
      new DefaultAPIError(400, "received null or undefined values")
    );
  }

  next();
}

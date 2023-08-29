import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import { InputType } from "../../utils/typeUtils";
import Filter from "bad-words";

export function usernameValidator(...[req, res, next]: InputType<{ username: string }>) {
  const { username } = req.body;
  const filter = new Filter();

  if (username.length > 255) {
    return sendErrorResponse(res, new DefaultAPIError(401, "Username too long"));
  }

  if (filter.isProfane(username)) {
    return sendErrorResponse(res, new DefaultAPIError(400, "Username contains profane lang"));
  }

  next();
}

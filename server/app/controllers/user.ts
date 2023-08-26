import { addUserService } from "../services/user";
import { ControllerInput } from "../../utils/typeUtils";
import { sendErrorResponse } from "../../errors/utility-functions";
import { sendSuccessResponse } from "../../success/utility-functions";
import { intoResultAsync } from "../../hof/result";
import { DefaultAPIError } from "../../errors/ApiError";

export interface UserInfo {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export async function addUser(...[req, res]: ControllerInput<UserInfo>) {
  const { email, password, username, avatar } = req.body;

  const [result, err] = await intoResultAsync<typeof addUserService, DefaultAPIError>(
    addUserService,
    {
      email,
      password,
      username,
      avatar,
    }
  );

  if (err) {
    return sendErrorResponse(res, err);
  }

  return sendSuccessResponse(res, result);
}

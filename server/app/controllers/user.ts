import { addUserService } from "../services/user";
import { ControllerInput } from "../../utils/typeUtils";
import { sendErrorResponse } from "../../errors/utility-functions";
import { sendSuccessResponse } from "../../success/utility-functions";

export interface UserInfo {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export async function addUser(...[req, res]: ControllerInput<UserInfo>) {
  const { email, password, username, avatar } = req.body;

  const [result, err] = await addUserService({
    email,
    password,
    username,
    avatar,
  });

  if (err) {
    return sendErrorResponse(res, err);
  }

  return sendSuccessResponse(res, result);
}

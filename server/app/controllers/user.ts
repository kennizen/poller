import { loginUserService, registerUserService } from "../services/user";
import { InputType } from "../../utils/typeUtils";
import { sendErrorResponse } from "../../errors/utility-functions";
import { sendSuccessResponse } from "../../success/utility-functions";
import { intoResultAsync } from "../../hof/result";
import { DefaultAPIError } from "../../errors/ApiError";

export interface UserRegistrationInfo {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UserLoginInfo {
  email: string;
  password: string;
}

export async function registerUser(...[req, res]: InputType<UserRegistrationInfo>) {
  const { email, password, username, avatar } = req.body;

  const [result, error] = await intoResultAsync<typeof registerUserService, DefaultAPIError>(
    registerUserService,
    {
      email,
      password,
      username,
      avatar,
    }
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

export async function loginUser(...[req, res]: InputType<UserLoginInfo>) {
  const { email, password } = req.body;

  const [result, error] = await intoResultAsync<typeof loginUserService, DefaultAPIError>(
    loginUserService,
    {
      email,
      password,
    }
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

import { loginUserService, registerUserService } from "../services/user";
import { InputType } from "../../utils/typeUtils";
import { sendErrorResponse } from "../../errors/utility-functions";
import { sendSuccessResponse } from "../../success/utility-functions";
import { intoResultAsync } from "../../hof/result";
import { DefaultAPIError } from "../../errors/ApiError";
import { checkUndefinedValues } from "../../utils/checkUndefinedValues";

export interface IUserRegistrationInfo {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface IUserLoginInfo {
  email: string;
  password: string;
}

export async function registerUser(...[req, res]: InputType<IUserRegistrationInfo>) {
  const { email, password, username, avatar } = req.body;

  const val = checkUndefinedValues([email, password, username, avatar]);

  if (val) {
    return sendErrorResponse(res, val);
  }

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

export async function loginUser(...[req, res]: InputType<IUserLoginInfo>) {
  const { email, password } = req.body;

  const val = checkUndefinedValues([email, password]);

  if (val) {
    return sendErrorResponse(res, val);
  }

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

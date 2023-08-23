import { Response } from "express";
import { DefaultAPISuccess } from "./ApiSuccess";

export function sendSuccessResponse<T>(res: Response, success: DefaultAPISuccess<T>) {
  return res.status(success.statusCode).json(success);
}

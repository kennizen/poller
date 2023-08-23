import { Response } from "express";
import { DefaultAPIError } from "./ApiError";

export function sendErrorResponse(res: Response, error: DefaultAPIError) {
  return res.status(error.statusCode).json({
    message: error.message,
    statusCode: error.statusCode,
    status: error.status,
  });
}

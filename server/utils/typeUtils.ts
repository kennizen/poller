import { Request, Response, NextFunction } from "express";

export type InputType<
  T extends Record<string, any>,
  P extends Record<string, any> = {},
  S extends Record<string, any> = {}
> = readonly [Request<P, {}, T & {userId?: string}, {}>, Response<S>, NextFunction];

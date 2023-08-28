import { Request, Response, NextFunction } from "express";

export type InputType<
  T extends Record<string, any>,
  S extends Record<string, any> = {}
> = readonly [Request<{}, {}, T, {}>, Response<S>, NextFunction];

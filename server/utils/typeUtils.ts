import { Request, Response } from "express";

export type ControllerInput<
  T extends Record<string, any>,
  S extends Record<string, any> = {}
> = readonly [Request<{}, {}, T, {}>, Response<S>];

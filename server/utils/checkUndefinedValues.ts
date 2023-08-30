import { DefaultAPIError } from "../errors/ApiError";

export function checkUndefinedValues(data: any[]) {
  if (data.some((ele) => ele === undefined)) {
    return new DefaultAPIError(400, "Payload body keys mismatched");
  }
  return null;
}

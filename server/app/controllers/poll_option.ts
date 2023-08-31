import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import { intoResultAsync } from "../../hof/result";
import { sendSuccessResponse } from "../../success/utility-functions";
import { checkUndefinedValues } from "../../utils/checkUndefinedValues";
import { InputType } from "../../utils/typeUtils";
import { pollResponseService } from "../services/poll_option";

export async function pollResponse(
  ...[req, res]: InputType<{ options: string[]; poll_id: string }>
) {
  const { options, poll_id, userId } = req.body;

  const val = checkUndefinedValues([userId]);

  if (val) {
    return sendErrorResponse(res, val);
  }

  const [result, error] = await intoResultAsync<typeof pollResponseService, DefaultAPIError>(
    pollResponseService,
    {
      options,
      poll_id,
      responder_id: userId as string,
    }
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

import { DefaultAPIError } from "../../errors/ApiError";
import { sendErrorResponse } from "../../errors/utility-functions";
import { intoResultAsync } from "../../hof/result";
import { sendSuccessResponse } from "../../success/utility-functions";
import { checkUndefinedValues } from "../../utils/checkUndefinedValues";
import { InputType } from "../../utils/typeUtils";
import {
  IUpdatePoll,
  createPollService,
  deletePollService,
  getAllPollsService,
  updatePollService,
} from "../services/poll";

export interface IPoll {
  creator_id: string;
  title: string;
  multi_selection: boolean;
  options: string[];
}

export async function createNewPoll(...[req, res]: InputType<IPoll>) {
  const { creator_id, options, title, multi_selection } = req.body;

  const val = checkUndefinedValues([creator_id, options, title, multi_selection]);

  if (val) {
    return sendErrorResponse(res, val);
  }

  const [result, error] = await intoResultAsync<typeof createPollService, DefaultAPIError>(
    createPollService,
    {
      creator_id,
      options,
      title,
      multi_selection,
    }
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

export async function getAllPolls(...[_, res]: InputType<any>) {
  const [result, error] = await intoResultAsync<typeof getAllPollsService, DefaultAPIError>(
    getAllPollsService
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

export async function updatePoll(...[req, res]: InputType<IUpdatePoll>) {
  const { options, poll_id, multi_selection, title } = req.body;

  const [result, error] = await intoResultAsync<typeof updatePollService, DefaultAPIError>(
    updatePollService,
    {
      options,
      poll_id,
      multi_selection,
      title,
    }
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

export async function deletePoll(...[req, res]: InputType<{}, { id: string }>) {
  const { id } = req.params;

  const [result, error] = await intoResultAsync<typeof deletePollService, DefaultAPIError>(
    deletePollService,
    id
  );

  if (error) {
    return sendErrorResponse(res, error);
  }

  return sendSuccessResponse(res, result);
}

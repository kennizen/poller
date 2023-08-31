import { DefaultAPIError } from "../../errors/ApiError";
import { pool } from "../../server";
import { DefaultAPISuccess } from "../../success/ApiSuccess";
import { IPollModel } from "../models/models";

export interface IPollResponse {
  responder_id: string;
  poll_id: string;
  options: string[];
}

export async function pollResponseService({ options, poll_id, responder_id }: IPollResponse) {
  const res = await pool.query<IPollModel>(`SELECT * FROM polls WHERE poll_id=${poll_id}`);

  if (res.rowCount <= 0) {
    throw new DefaultAPIError(406, "Cannot answer poll");
  }

  const poll = res.rows[0];

  if (poll.multi_selection === false && options.length > 1) {
    throw new DefaultAPIError(400, "Cannot update poll");
  }

  for (let i = 0; i < options.length; i++) {
    await pool.query(
      `INSERT INTO responders (option_id, poll_id, responder_id) VALUES($1, $2, $3)`,
      [options[i], poll_id, responder_id]
    );
  }

  return new DefaultAPISuccess(200, "Success", poll.poll_id);
}

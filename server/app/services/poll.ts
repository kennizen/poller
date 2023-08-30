import { DefaultAPIError } from "../../errors/ApiError";
import { pool } from "../../server";
import { DefaultAPISuccess } from "../../success/ApiSuccess";
import { IPoll } from "../controllers/poll";
import { IPollModel, IPollOptionModel } from "../models/models";
export interface IUpdatePoll {
  poll_id: string;
  title?: string;
  multi_selection?: boolean;
  options?: { option_id: string; description: string }[];
}

export async function createPollService({ creator_id, options, title, multi_selection }: IPoll) {
  const res = await pool.query(
    `INSERT INTO polls (creator_id, title, multi_selection)  VALUES($1, $2, $3) RETURNING poll_id`,
    [creator_id, title, multi_selection]
  );

  const pollId: string = res.rows[0].poll_id;

  for (let i = 0; i < options.length; i++) {
    await pool.query(`INSERT INTO poll_options (poll_id, description) VALUES($1, $2)`, [
      pollId,
      options[i],
    ]);
  }

  return new DefaultAPISuccess(201, "Poll created", pollId);
}

export async function getAllPollsService() {
  const ret = [];
  const res = await pool.query<IPollModel>(`SELECT * FROM polls`);

  for (let i = 0; i < res.rowCount; i++) {
    const opt = await pool.query<IPollOptionModel>(
      `SELECT * from poll_options WHERE poll_id=${res.rows[i].poll_id}`
    );
    ret.push({
      ...res.rows[i],
      options: opt.rows,
    });
  }

  return new DefaultAPISuccess(201, "Poll created", ret);
}

export async function updatePollService({ options, poll_id, multi_selection, title }: IUpdatePoll) {
  const poll = await pool.query<IPollModel>(`SELECT * FROM polls WHERE poll_id=${poll_id}`);

  if (poll.rowCount <= 0) throw new DefaultAPIError(403, "Cannot update");

  await pool.query(
    `UPDATE polls SET title='${title ?? poll.rows[0].title}', multi_selection='${
      multi_selection ?? poll.rows[0].multi_selection
    }' WHERE poll_id=${poll_id}`
  );

  if (options !== undefined) {
    for (let i = 0; i < options.length; i++) {
      await pool.query(
        `UPDATE poll_options SET description='${options[i].description}' WHERE option_id=${options[i].option_id} AND poll_id=${poll_id}`
      );
    }
  }

  return new DefaultAPISuccess(200, "Poll updated", poll.rows[0].poll_id);
}

export async function deletePollService(id: string) {
  const deletedPoll = await pool.query<IPollModel>(
    `DELETE FROM polls WHERE poll_id=${id} RETURNING poll_id`
  );

  return new DefaultAPISuccess(200, "Poll deleted", deletedPoll.rows[0].poll_id);
}

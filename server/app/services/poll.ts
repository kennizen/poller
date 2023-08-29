import { pool } from "../../server";
import { DefaultAPISuccess } from "../../success/ApiSuccess";
import { IPoll } from "../controllers/poll";

export interface IPollOptionModel {
  option_id: string;
  poll_id: string;
  description: string;
}

export interface IPollModel {
  poll_id: string;
  creator_id: string;
  title: string;
  multi_selection: boolean;
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

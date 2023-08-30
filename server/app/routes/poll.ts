import { Router } from "express";
import { emptyValuesValidator } from "../middlewares/emptyValuesValidator";
import { createNewPoll, deletePoll, getAllPolls, updatePoll } from "../controllers/poll";
import { authorize } from "../middlewares/authorize";

const pollRouter = Router();

pollRouter.post("/", authorize, emptyValuesValidator, createNewPoll);
pollRouter.get("/", authorize, getAllPolls);
pollRouter.patch("/", authorize, emptyValuesValidator, updatePoll);
pollRouter.delete("/:id", authorize, deletePoll);

export default pollRouter;

import { Router } from "express";
import { emptyValuesValidator } from "../middlewares/emptyValuesValidator";
import { createNewPoll, getAllPolls } from "../controllers/poll";
import { authorize } from "../middlewares/authorize";

const pollRouter = Router();

pollRouter.post("/", authorize, emptyValuesValidator, createNewPoll);
pollRouter.get("/", authorize, getAllPolls);

export default pollRouter;

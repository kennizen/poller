import { Router } from "express";
import { emptyValuesValidator } from "../middlewares/emptyValuesValidator";
import { authorize } from "../middlewares/authorize";
import { pollResponse } from "../controllers/poll_option";

const pollOptionRouter = Router();

pollOptionRouter.post("/", authorize, emptyValuesValidator, pollResponse);

export default pollOptionRouter;

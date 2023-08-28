import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user";
import validUserInfo from "../middlewares/validUserInfo";

const router = Router();

router.post("/register", validUserInfo, registerUser);
router.post("/login", validUserInfo, loginUser);

export default router;

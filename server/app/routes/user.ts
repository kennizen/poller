import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user";
import { emailValidator } from "../middlewares/emailValidator";
import { passwordValidator } from "../middlewares/passwordValidator";
import { usernameValidator } from "../middlewares/usernameValidator";
import { emptyValuesValidator } from "../middlewares/emptyValuesValidator";

const userRouter = Router();

userRouter.post(
  "/register",
  emptyValuesValidator,
  emailValidator,
  passwordValidator,
  usernameValidator,
  registerUser
);
userRouter.post("/login", emptyValuesValidator, emailValidator, passwordValidator, loginUser);

export default userRouter;

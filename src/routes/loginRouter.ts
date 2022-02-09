import { Router } from "express";
import { loginUser } from "../controllers/loginController";
import { loginReQuestValidations } from "../utils/validation/userValidation";

const loginRouter = Router();

loginRouter.post('/',loginReQuestValidations,loginUser);

export default loginRouter;
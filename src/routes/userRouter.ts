import { Router } from "express";

const userRouter = Router();


//POST

userRouter.post('/',createUser);
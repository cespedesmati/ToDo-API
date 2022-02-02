import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers } from "../controllers/userController";

const userRouter = Router();

//GET
userRouter.get('/',getUsers);
userRouter.get('/:id',getUserById);

//POST
userRouter.post('/',createUser);

//DELETE
userRouter.delete('/:id',deleteUser);


export default userRouter;
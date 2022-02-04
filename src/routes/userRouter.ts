import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, getUsersTasks, updateUser } from "../controllers/userController";
import { userDeleteRequestValidations, userGetRequestValidations, userPostRequestValidations, userPutRequestValidations } from '../utils/validation/userValidation';

const userRouter = Router();

//GET
userRouter.get('/',getUsers);
userRouter.get('/detail',getUsersTasks);
userRouter.get('/:id',userGetRequestValidations,getUserById);

//POST
userRouter.post('/',userPostRequestValidations,createUser);

//PUT
userRouter.put('/:id',userPutRequestValidations,updateUser);

//DELETE
userRouter.delete('/:id',userDeleteRequestValidations,deleteUser);

export default userRouter;
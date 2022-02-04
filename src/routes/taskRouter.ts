import { Router } from 'express';
import {getTasks,createTask, getTaskById, updateTask, deleteTask} from '../controllers/taskControllers';
import { deleteRequestValidations, getRequestValidations, postRequestValidations, putRequestValidations } from '../utils/validation/taskValidation';
const taskRouter = Router();

//GET
taskRouter.get('/', getTasks);
taskRouter.get('/:id', getRequestValidations, getTaskById);

//POST
taskRouter.post('/', postRequestValidations, createTask);

//PUT
taskRouter.put('/:id', putRequestValidations, updateTask);

//DELETE
taskRouter.delete('/:id',deleteRequestValidations, deleteTask);



export default taskRouter;



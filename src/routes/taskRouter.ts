import { Router } from 'express';
import {getTasks,createTask, getTaskById, updateTask} from '../controllers/taskControllers';
import { postRequestValidations, putRequestValidations } from '../utils/validation/taskValidation';

const taskRouter = Router();

//GET
taskRouter.get('/', getTasks);
taskRouter.get('/:id',getTaskById);

//POST
taskRouter.post('/', postRequestValidations, createTask);

//PUT
taskRouter.put('/:id', putRequestValidations, updateTask);

// //DELETE
// taskRouter.delete('/id',deleteTask);



export default taskRouter;



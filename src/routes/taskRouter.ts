import { Router } from 'express';
import {getTasks,createTask} from '../controllers/taskControllers';
import { postRequestValidations } from '../utils/validation/taskValidation';

const taskRouter = Router();

//GET
taskRouter.get('/', getTasks);

//POST
taskRouter.post('/',postRequestValidations,createTask);



export default taskRouter;
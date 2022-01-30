import { Router } from 'express';
import {getTasks,createTask} from '../controllers/taskControllers';

const taskRouter = Router();

//GET
taskRouter.get('/', getTasks);

//POST
taskRouter.post('/',createTask);



export default taskRouter;
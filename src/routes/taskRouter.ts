import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import TaskService from "../service/taskService";
import {getTasks} from '../controllers/taskControllers';
const taskService = new TaskService();

const taskRouter = Router();


taskRouter.get('/', getTasks);


taskRouter.get('/s', (request: Request, response: Response, next: NextFunction) => {
    try {
        const tasks = taskService.findAll();
        response.json(tasks);
    } catch (error) {
        next(error);
    }
});

export default taskRouter;
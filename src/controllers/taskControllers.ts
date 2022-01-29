import { Request, Response, NextFunction, RequestHandler } from 'express';
import TaskService from "../service/taskService";
const taskService = new TaskService();

export const getTasks: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.findAll();
        response.json(tasks) ;
    } catch (error) {
        next(error);
    }
};


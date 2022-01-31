import { Request, Response, NextFunction, RequestHandler } from 'express';
import { TaskType } from '../model/tasksModel';
import TaskService from "../service/taskService";
import loggerInstance from '../utils/logger';
const taskService = new TaskService();

export const getTasks: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.findAll();
        loggerInstance.info(typeof tasks[0].expirationDate);
        response.json(tasks) ;
    } catch (error) {
        next(error);
    }
};

export const createTask: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        console.log(request.body);
        const bodyTask = <TaskType>request.body ;
        const savedTask = await taskService.saveTask(bodyTask) as TaskType;
        response.send(savedTask);
    } catch (error) {
        next(error);
    }
};



// export const createTask: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
//     try {
//         const bodyTask = request.body as TaskType;
//         const task: TaskType = new Task({
//             title: bodyTask.title,
//             description: bodyTask.description,
//             status: bodyTask.status,
//             expirationDate: bodyTask.expirationDate
//         });
//         const savedTask = await task.save();
//         response.send(savedTask);
//     } catch (error) {
//         next(error);
//     }
// };

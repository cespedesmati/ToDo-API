import { Request, Response, NextFunction, RequestHandler } from 'express';
import { TaskType } from '../model/tasksModel';
import TaskService from "../service/taskService";
import { RequestCustom } from '../utils/middleware';
const taskService = new TaskService();

export const getTasks: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tasks = await taskService.findAll();
        response.json(tasks) ;
    } catch (error) {
        next(error);
    }
};

export const getTasksUsers : RequestHandler = async(request:Request, response:Response, next:NextFunction) => {
    try {
        const tasksDetail = await taskService.findAllByUser();
        response.json(tasksDetail);
    } catch (error) {
        next(error);
    }
};

export const getTaskById: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const {id}  = request.params;
        const task = await taskService.findById(id);
        if (task != null){
            response.json(task);
        }else{
            throw new Error('ID does not exist in DB');
        } 
    }catch (error) {
        next(error);
    }
};


export const createTask: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const bodyTask = <TaskType>request.body ;
        const req = request as RequestCustom;
        bodyTask.user = req.user;
        const savedTask = await taskService.saveTask(bodyTask) as TaskType;
        response.send(savedTask);
    } catch (error) {
        next(error);
    }
};

export const updateTask: RequestHandler = async(request: Request, response: Response, next: NextFunction) =>{
    try {
        const {id}  = request.params;
        const bodyTask = <TaskType>request.body;
        const updateTask = await taskService.updateTask(id,bodyTask);
        response.send(updateTask);
    } catch (error) {
        next(error);
    }
};

export const deleteTask: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const {id}  = request.params;
        await taskService.deleteTask(id);
        response.json({message : `Task with id: ${id} deleted.`});
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

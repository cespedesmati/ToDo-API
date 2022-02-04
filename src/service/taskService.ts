
import TaskRepository from "../repositories/taskRepository";
const taskRepository = new TaskRepository();
import { TaskType } from "../model/tasksModel";
import { FilterQuery, ObjectId } from "mongoose";
import UserService from "./userService";
const userService = new UserService();

class TaskService{

    async findAll(){
        return await taskRepository.getAll();
    }

    async findById(id:string){
        return await taskRepository.getById(id);
    }

    async saveTask(task: TaskType){
        const savedTask = await taskRepository.save(task);
        const user = await userService.findById(String(task.user));
        if(user){
            await userService.updateUserForTask(<ObjectId>user.id,<ObjectId>savedTask._id);
        }
        return savedTask;
    }

    async updateTask(id:string, bodyTask:TaskType){
        return await taskRepository.update(id,bodyTask);
    }

    async deleteTask(id: string){
        return await taskRepository.delete(id);
    }

    async findTitle(title : FilterQuery<TaskType> | undefined){
        return await taskRepository.getTitle(title);
    }
}


export default TaskService;
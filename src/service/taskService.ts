import TaskRepository from "../repositories/taskRepository";
const taskRepository = new TaskRepository();
import { TaskType } from "../model/tasksModel";
import { FilterQuery } from "mongoose";

class TaskService{

    async findAll(){
        return await taskRepository.getAll();
    }

    async findById(id:string){
        return await taskRepository.getById(id);
    }

    async saveTask(task: TaskType){
        return await taskRepository.save(task);
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
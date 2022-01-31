import TaskRepository from "../repositories/taskRepository";
const taskRepository = new TaskRepository();
import { TaskType } from "../model/tasksModel";
import { FilterQuery } from "mongoose";

class TaskService{

    async findAll(){
        return await taskRepository.getAll();
    }

    async saveTask(task: TaskType){
        return await taskRepository.save(task);
    }

    async findTitle(title : FilterQuery<TaskType> | undefined){
        return await taskRepository.getTitle(title);
    }
}


export default TaskService;
import TaskRepository from "../repositories/taskRepository";
const taskRepository = new TaskRepository();
import { TaskType } from "../model/tasksModel";

class TaskService{

    async findAll(){
        return await taskRepository.getAll();
    }

    async saveTask(task: TaskType){
        return await taskRepository.save(task);
    }
}


export default TaskService;
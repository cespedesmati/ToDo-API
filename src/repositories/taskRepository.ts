import Task from '../model/tasksModel';
import { TaskType } from '../model/tasksModel';

class TaskRepository{

    async getAll(){
        return await Task.find();
    }

    async save(task: TaskType){
        return await Task.create(task);
    }
}

export default TaskRepository;
import { FilterQuery } from 'mongoose';
import Task from '../model/tasksModel';
import { TaskType } from '../model/tasksModel';

class TaskRepository{

    async getAll(){
        return await Task.find();
    }

    async save(task: TaskType){
        return await Task.create(task);
    }

    async getTitle (title: FilterQuery<TaskType> | undefined){
        return await Task.findOne(title);
    }
}

export default TaskRepository;
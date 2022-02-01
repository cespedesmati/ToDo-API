import { FilterQuery } from 'mongoose';
import Task from '../model/tasksModel';
import { TaskType } from '../model/tasksModel';

class TaskRepository{

    async getAll(){
        return await Task.find();
    }

    async getById(id:string){
        return await Task.findById(id); 
    }

    async save(task: TaskType){
        return await Task.create(task);
    }

    async update(id:string, bodyTask:TaskType){
        return await Task.findByIdAndUpdate(id,bodyTask,{new:true});
    }

    async delete(id: string){
        return await Task.findByIdAndRemove(id);
    }

    async getTitle (title: FilterQuery<TaskType> | undefined){
        return await Task.findOne(title);
    }
}

export default TaskRepository;
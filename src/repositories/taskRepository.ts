import Task from '../model/tasksModel';

class TaskRepository{

    async getAll(){
        return await Task.find();
    }
}

export default TaskRepository;
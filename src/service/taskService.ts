import TaskRepository from "../repositories/taskRepository";
const taskRepository = new TaskRepository();

class TaskService{

    async findAll(){
        return await taskRepository.getAll();
    }
}


export default TaskService;
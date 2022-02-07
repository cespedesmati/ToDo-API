import Task from "../src/model/tasksModel";

export const initialTasks = [
    {
        title: 'Llevar el auto a lavar',
        description:'El auto esta sucio, necesito llevarlo al lavadero',
        expirationDate:'2022-02-25',
        user: '61faadd11700d894d367c515'
    },
    {
        title: 'Ir a la ferreteria',
        description:'Necesito un portacable para el escritorio',
        expirationDate:'2022-02-20',
        user: '61faadd11700d894d367c820'
    }
];

export const taskDB = async() => {
    const tasks = await Task.find({});
    return tasks.map(task => task.toJSON());
};

export const nonExistingId = async() => {
    const task = new Task({title: 'Tarea de prueba para id', expirationDate:'2022-02-25'});
    await task.save();
    await task.remove();
    return String(task._id);
};


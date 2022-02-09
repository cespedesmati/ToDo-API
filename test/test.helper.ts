import Task from "../src/model/tasksModel";
import User from "../src/model/userModel";
import * as bcrypt from 'bcrypt';

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
        user: '61faadd11700d894d367c515'
    }
];

export const initialUsers = [
    {
        email: 'admin@gmail.com',
        password:'password12356'
    }
];

export async function  initialDatabase(){
    await User.deleteMany({});
    await Task.deleteMany({});

    const user = new User({
        email: 'admin@gmail.com',
        password: await bcrypt.hash('password12356',10)
    });
    await user.save();
    const userId = await User.find({}).select({"id":1});

    for (let i = 0; i < initialTasks.length;i++){
        initialTasks[i].user = String(userId[0]._id);
    }
    const taskObjects = initialTasks.map(task => new Task(task));
    const promiseArray = taskObjects.map(task => task.save());

    await Promise.all(promiseArray);
}

export const taskDB = async() => {
    const tasks = await Task.find({});
    return tasks.map(task => task.toJSON());
};

export const userDB = async() => {
    const users = await User.find({}).select({"email":1});
    return users.map(user => user.toJSON());
};

export const adminId = async() => {
    const user = await User.find({}).select({"id":1});
    const id = String(user[0]._id);
    return id;
};

export const nonExistingId = async() => {
    const task = new Task({title: 'Tarea de prueba para id', expirationDate:'2022-02-25'});
    await task.save();
    await task.remove();
    return String(task._id);
};

export const nonExistingIdUser = async() => {
    const user = new User({email:'pruebaUser@gmail.com',password:'contrasenaPrueba'});
    await user.save();
    await user.remove();
    return String(user._id);
};


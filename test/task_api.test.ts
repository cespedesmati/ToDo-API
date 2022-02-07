import supertest from "supertest";
import mongoose from "mongoose";
import app from '../src/app';
import Task from "../src/model/tasksModel";
import { initialTasks,nonExistingId,taskDB  } from './test.helper';
import { TaskType } from '../src/model/tasksModel';
const api = supertest(app);

beforeEach(async() => {
    await Task.deleteMany({});

    const taskObjects = initialTasks.map(task => new Task(task));
    const promiseArray = taskObjects.map(task => task.save());

    await Promise.all(promiseArray);
});

describe('Getting the tasks ',() => {

    test('tasks are returned as json with status 200', async () => {
        await api
            .get('/tasks')
            .expect(200)
            .expect('Content-Type','application/json; charset=utf-8');
    });

    test('all tasks are returned', async () => {
        const response = await api.get('/tasks');
        expect(response.body).toHaveLength(initialTasks.length);
    });

    test('a specific task is within the returned tasks', async() => {
        const response = await api.get('/tasks');
        const arrayTasks = response.body as TaskType[];
        const content = arrayTasks.map(task => task.title) ;
        expect(content).toContain(
            'Llevar el auto a lavar'
        );

    });
});

describe('Getting tasks with specific id',() => {

    test('succes with a valid id', async() => {

        const token = await generateToken();
        const tasksInDb = await taskDB();
        const firstTask = tasksInDb[0];
        const fistTaskId = String(tasksInDb[0]._id);
        
        
        const resultTask = await api
        .get(`/tasks/${fistTaskId}`)
        .set('Authorization', token)
        .expect(200)
        .expect('Content-Type','application/json; charset=utf-8');
        

        const firstTaskToJson = JSON.parse(JSON.stringify(firstTask)) as TaskType;
        expect(resultTask.body).toEqual(firstTaskToJson);

    });

    test('fail with statuscode 404 if note does not exist', async() => {
        const token = await generateToken();
        const validNonExistingId = await nonExistingId();
        
        await api
        .get(`/tasks/${validNonExistingId}`)
        .set('Authorization', token)
        .expect(404);
    });

    test('fail with statuscode 400 if id is invalid', async() =>{
        const token = await generateToken();
        const invalidID = 123456789;
        await api
        .get(`/tasks/${invalidID}`)
        .set('Authorization', token)
        .expect(400);

    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

interface Itoken {
    token:string,
    email:string
}

async function generateToken(){
    const user = {
        "email":"matute@gmail.com",
        "password":"contrajwt"
    };
    const response = await api.post('/login').send(user);
    const {token} = <Itoken>response.body;
    return token;
}
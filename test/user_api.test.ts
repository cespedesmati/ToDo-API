import supertest from "supertest";
import mongoose from "mongoose";
import app from '../src/app';
import { adminId, initialDatabase, initialUsers, nonExistingIdUser, userDB } from './test.helper';
import { UserType } from "../src/model/userModel";
import { addTask, generateToken } from "./task_api.test";
import * as bcrypt from 'bcrypt';
import { TaskType } from '../src/model/tasksModel';


const api = supertest(app);

beforeEach(async() => {
    await initialDatabase();
});

describe('Getting the users',() => {

    test('users are returned as json with status 200', async () => {
        await api
            .get('/users')
            .expect(200)
            .expect('Content-Type','application/json; charset=utf-8');
    });

    test('all users are returned', async () => {
        const response = await api.get('/users');
        expect(response.body).toHaveLength(initialUsers.length);
    });

    test('a specific user is within the returned users', async() => {
        const response = await api.get('/users');
        const arrayUsers = response.body as UserType[];
        const content = arrayUsers.map(user => user.email);
        expect(content).toContain(
            'admin@gmail.com'
        );

    });
});

describe('Getting user with task details', () => {
    test('user with task detail are returned as json with status code 200', async () => {
        interface ITask{
            _id:string,
            title?:string
        }
        const addNewTask = await addTask("agregando tarea numero 1 ");
        await addTask("agregando tarea numero 12");
        await addTask("agregando tarea numero 123");
        const pruebaTaskBody = addNewTask.body as TaskType; 
        const token = await generateToken();

        const result = await api
            .get('/users/detail')
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type','application/json; charset=utf-8');

        const arrayUser = result.body as UserType[];
        const contentTask = arrayUser.map(user => user.tasks) ;
        const prueba = contentTask[0] as unknown as ITask[];   
        const arrayIds = prueba.map(function(item) {
            return item._id;
        });

        expect(arrayIds).toContain(pruebaTaskBody._id); 
  
    });
});


describe('Getting users with specific id', () => {
    test('succes with a valid user id', async() => {
        const token = await generateToken();
        const usersInDb = await userDB();
        const firstUser = usersInDb[0];
        const firstUserID = await adminId();

        const resultUser = await api
            .get(`/users/${firstUserID}`)
            .set('Authorization', token)
            .expect(200)
            .expect('Content-Type','application/json; charset=utf-8');

        const firstUserToJson = JSON.parse(JSON.stringify(firstUser)) as UserType;
        expect(resultUser.body).toEqual(firstUserToJson);
    });

    test('fail with statuscode 404 if user does not exist', async() => {
        const token = await generateToken();
        const validNonExistingId = await nonExistingIdUser();
        
        await api
        .get(`/users/${validNonExistingId}`)
        .set('Authorization', token)
        .expect(404);
    });

    test('fail with statuscode 400 if id is invalid', async() =>{
        const token = await generateToken();
        const invalidID = 123456789;
        await api
        .get(`/users/${invalidID}`)
        .set('Authorization', token)
        .expect(400);

    });
});


describe('Addition of a new user', () => {
    
    test('add user succeeds with a valid data', async () => {
        const token = await generateToken();
        const newUser = {
            email: 'userPrueba@gmail.com',
            password: await bcrypt.hash('passwordabcde',10)
        };

        await api
            .post('/users')
            .set('Authorization', token)
            .send(newUser)
            .expect(200)
            .expect('Content-Type','application/json; charset=utf-8');
        });
        
        test('add user fails with status 400 if required fields are not completed ', async () => {
        const token = await generateToken();
        const newUser = {
            email: 'userPrueba@gmail.com',
        };
        
        await api
        .post('/users')
        .set('Authorization', token)
        .send(newUser)
        .expect(400);
    });
    
    test('add user fails with status code 400 if data invaild', async () => {
        const token = await generateToken();
        const newUser = {
            email: 123124,
            password: await bcrypt.hash('passwordabcde',10)
        };
        
        await api
        .post('/users')
        .set('Authorization', token)
        .send(newUser)
        .expect(400);
    });
    
});

describe('Update of a user',() => {
    
    test('succeeds user update with valid data', async () => {
        const token = await generateToken();
        const userDbStart = await userDB();
        const userToUpdate = userDbStart[0];
        const idUserToUpdate = String(userToUpdate._id);
        
        const updateUser = {
            email:"emailDePrueba@gmail.com"
        };
        await api
        .put(`/users/${idUserToUpdate}`)
        .set('Authorization', token)
        .send(updateUser)
        .expect(200)
        .expect('Content-Type','application/json; charset=utf-8');
        
        const userInDb = await userDB();
        const emails = userInDb.map(user => user.email);
        expect(emails).not.toContain(userToUpdate.email);
        
    });
    
    test('update user fails with status code 400 if data invaild', async () => {
        const token = await generateToken();
        const idUserToUpdate = await adminId();
        
        const updateUser = {
            email:123124
        };

        await api
        .put(`/users/${idUserToUpdate}`)
        .set('Authorization', token)
        .send(updateUser)
        .expect(400)
        .expect('Content-Type','application/json; charset=utf-8');
    });
    
    test('update user fail with statuscode 404 if note does not exist', async() => {
        const token = await generateToken();
        const validNonExistingId = await nonExistingIdUser();
        
        await api
        .put(`/users/${validNonExistingId}`)
        .set('Authorization', token)
        .send({email:"emailDePrueba@gmail.com"})
        .expect(404);
    });
    
    test('update user fail with statuscode 400 if id is invalid', async() =>{
        const token = await generateToken();
        const invalidID = 123456789;
        await api
        .put(`/users/${invalidID}`)
        .set('Authorization', token)
        .send({email:"emailDePrueba@gmail.com"})
        .expect(400);
        
    });
});

describe('Deletion of a user', () => {
    test('succeeds with status code 200 if user is deleted', async() => {
        const token = await generateToken();
        const idUserToDelete = await adminId();

        await api
            .delete(`/users/${idUserToDelete}`)
            .set('Authorization', token)
            .expect(200);
        
        const userEnd = await userDB();
        expect(userEnd).toHaveLength(initialUsers.length - 1);

        //se puede agregar verificacion con mail pero antes agregar 1 user mas al inicio
    });

    test('delete user fail with statuscode 404 if note does not exist', async() => {
        const token = await generateToken();
        const validNonExistingId = await nonExistingIdUser();
        
        await api
        .delete(`/users/${validNonExistingId}`)
        .set('Authorization', token)
        .expect(404);
    });

    test('delete user fail with statuscode 400 if id is invalid', async() =>{
        const token = await generateToken();
        const invalidID = 123456789;
        await api
        .delete(`/users/${invalidID}`)
        .set('Authorization', token)
        .expect(400);

    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
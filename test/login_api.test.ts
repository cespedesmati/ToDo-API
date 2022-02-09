import supertest from "supertest";
import mongoose from "mongoose";
import app from '../src/app';
import { initialDatabase, initialUsers } from './test.helper';

const api = supertest(app);

beforeEach(async() => {
    await initialDatabase();
});

describe('Login user in app', () => {

    test('login user succeeds with a valid data',async () => {
        const user = initialUsers[0];

        await api
            .post('/login')
            .send(user)
            .expect(200)
            .expect('Content-Type','application/json; charset=utf-8');

    });

    test('login user fails with status code 400 if required field are not completed', async() => {
        const incompleteUser = {
            email:"emailPrueba@gmail.com"
        };

        await api
            .post('/login')
            .send(incompleteUser)
            .expect(400)
            .expect('Content-Type','application/json; charset=utf-8');
    });

    test('login user fails with status code 400 if data invalid', async() => {
        const invalidDataUser = {
            email:123124,
            password:"pass1234567"
        };

        await api
            .post('/login')
            .send(invalidDataUser)
            .expect(400)
            .expect('Content-Type','application/json; charset=utf-8');
    });

    test('login user fails with status code 401 if data is wrong', async() => {
        const nonExistentUser = {
            email:"nonExistentUser@gmail.com",
            password:"pass1234567"
        };

        await api
            .post('/login')
            .send(nonExistentUser)
            .expect(401)
            .expect('Content-Type','application/json; charset=utf-8');
    });

});



afterAll(async () => {
    await mongoose.connection.close();
});
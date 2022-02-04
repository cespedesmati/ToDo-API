import { UserType } from "../model/userModel";
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
import UserRepository from "../repositories/userRepository";
import { ObjectId } from "mongoose";
const userRepository = new UserRepository();

class UserService{

    async findAll(){
        return userRepository.getAll();
    }

    async findAllByTasks(){
        return userRepository.getAllByTasks();
    }

    async findById(id:string){
        return await userRepository.getById(id);
    }

    async saveUser(user: UserType){
        const pass = await bcrypt.hash(user.password,saltRounds);
        user.password = pass;
        return await userRepository.save(user);
    }

    async updateUser(id:string, bodyUser:UserType){
        if(bodyUser.password){
            const pass = await bcrypt.hash(bodyUser.password,saltRounds);
            bodyUser.password = pass;
        }
        return await userRepository.update(id,bodyUser);
    }

    async updateUserForTask(id:ObjectId, idTask:ObjectId){ 
        return await userRepository.updateForTask(id,idTask);
    }

    async deleteUser(id: string){
        return await userRepository.delete(id);
    }

    async findByEmail(email: string){
        return await userRepository.getByEmail(email);
    }
}


export default UserService;
import { UserType } from "../model/userModel";
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
import UserRepository from "../repositories/userRepository";
const userRepository = new UserRepository();

class UserService{

    async saveUser(user: UserType){
        //comprobar aca me quede
        const pass = await bcrypt.hash(user.passwordCrypt,saltRounds);
        console.log(pass);
        return await userRepository.save(user);
    }
}
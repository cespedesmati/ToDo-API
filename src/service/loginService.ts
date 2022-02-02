import UserRepository from "../repositories/userRepository";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserType } from '../model/userModel';
import config from "../utils/config";
const userRepository = new UserRepository();

class LoginService{

    async loginAccess(userBody: UserType){
        const user = await userRepository.getByEmail(userBody.email);

        const isPassword = (user === null)
            ? false
            : await bcrypt.compare(userBody.password,user.password);

        if(!user || !isPassword){
            throw new Error('Authentification failed!, invalid email or password');
        }

        const id = user?._id as string;
        const token = jwt.sign({id},config.auth.secret,{expiresIn: config.auth.ttl});
        return {
            token,
            email:user?.email
        };
    }
}


export default LoginService;
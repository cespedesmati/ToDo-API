
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserType } from '../model/userModel';
import config from "../utils/config";
import { AppError } from '../utils/appError';

import UserService from "./userService";
const userService = new UserService();

class LoginService{

    async loginAccess(userBody: UserType){
        const user = await userService.findByEmail(userBody.email);

        const isPassword = (user === null)
            ? false
            : await bcrypt.compare(userBody.password,user.password);

        if(!user || !isPassword){
            throw new AppError('Authentification failed!, invalid email or password',401);
        }

        const id = user?._id as string;
        const token = jwt.sign({id},config.auth.secret,{expiresIn: config.auth.ttl});
        return {
            token,
            email:user?.email
        };
    }


    async validToken(token:string){

        if(!token){
            throw new AppError('Token required',401,'Unauthorized.');
        }

        let idUser: string;
        try {
            const decodedToken = jwt.verify(token,config.auth.secret) as IDecodedToken;
            idUser = decodedToken.id ;
        } catch (error) {
            throw new AppError('Invalid token!', 401, String(error));
        }
        const user = await userService.findById(idUser);

        if(!user){
            throw new AppError('Invalid token', 401, 'User not found.');
        }

        return user;
    }
}

interface IDecodedToken {
    id:string,
    iat:number,
    exp:number
}

export default LoginService;
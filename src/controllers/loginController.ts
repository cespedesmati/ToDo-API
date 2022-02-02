import { Request, Response, NextFunction, RequestHandler } from 'express';
import LoginService from '../service/loginService';
import { UserType } from '../model/userModel';
const loginService = new LoginService();

export const loginUser: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    
    try {
        const user = request.body as UserType;
        const userLogin = await loginService.loginAccess(user);
        response.json(userLogin);        
    } catch (error) {
        next(error);
    }

};
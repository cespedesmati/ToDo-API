import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import LoginService from '../service/loginService';
const loginService = new LoginService();

export interface RequestCustom extends Request{
    user: ObjectId;
}



export const validJWT = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.headers.authorization;
        const user = await loginService.validToken(<string>token);
        const req = request as RequestCustom;
        req.user = user._id as ObjectId;
        next();
    } catch (error) {
        next(error);
    }
};


import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongoose';
import LoginService from '../service/loginService';
import { AppError} from './appError';
import {validationResult} from 'express-validator';
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

/**
 *  ----------------------------------
    Handler para errores de validacion
    ----------------------------------
*/
export const _validationResult = (request: Request, response: Response, next: NextFunction) => {
    const error = validationResult(request);
    if(!error.isEmpty()){
        const err = new AppError('Validation Errors.', 400, String(error.array()[0].msg));
        next(err);
    }
    next();
};

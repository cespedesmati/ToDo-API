import {check,validationResult} from 'express-validator';
import { Request, Response, NextFunction} from 'express';
import { AppError} from '../appError';

// const isString = (text :  any) : text is string => {
//     return typeof text === 'string' || text instanceof String;
// };

const _titleRequired = check('title', 'Title required.').not().isEmpty();

const _validationResult = (request: Request, response: Response, next: NextFunction) => {
    const error = validationResult(request);
    if(!error.isEmpty()){
        const err = new AppError('Validation Errors.', 400, String(error.array()[0].msg));
        next(err);
    }
    next();
};


export const postRequestValidations = [
    _titleRequired,
    _validationResult
];
import {body,check,CustomValidator,validationResult} from 'express-validator';
import { Request, Response, NextFunction} from 'express';
import { AppError} from '../appError';
import TaskService from '../../service/taskService';
const taskService = new TaskService();


/**
 *  -------------------------
    Validaciones para title
    -------------------------
 */
const _titleRequired = check('title', 'Title required.').not().isEmpty();
const _titleIsString = check('title', 'Title must be a string.').isString();
const _titleIsLength = body('title', 'Title size must be at least 12 characters.').isLength({min:12});

const _titleIsUniqueFunction : CustomValidator = async(value) => {
    const tasksDB = await taskService.findAll();
    const titleDB = tasksDB.map((tasks) => tasks.title);
    if(titleDB.includes(String(value))) {
        throw new Error('Title is already in the database, must be unique.');
    }
};

const _titleIsUnique = body('title').custom(_titleIsUniqueFunction);

/**
 *  ------------------------------
    Validaciones para description
    ------------------------------
 */
const _descriptionIsString = check('description', 'Description must be a string.').optional().isString();


/**
 *  -------------------------
    Validaciones para status
    -------------------------
 */
const _statusIsString = check('status', 'Status must be a string.').optional().isString();
const _statusValid = check('status','Status must be in progress or completed.').optional().toLowerCase().isIn(['in progress', 'completed']);

/**
 *  -----------------------
    Validaciones para expirationDate
    -----------------------
 */

const _expirationDateRequired = check('expirationDate', 'ExpirationDate required.').not().isEmpty();
const _expirationDateIsDate = check('expirationDate', 'ExpirationDate must be a date.').isDate();

/**
 *  ----------------------------------
    Handler para errores de validacion
    ----------------------------------
*/
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
    _titleIsString,
    _titleIsLength,
    _titleIsUnique,
    _descriptionIsString,
    _statusIsString,
    _statusValid,
    _expirationDateRequired,
    _expirationDateIsDate,
    _validationResult
];

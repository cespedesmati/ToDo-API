import {body,check,CustomValidator} from 'express-validator';
import { validJWT } from '../middleware';
import { _validationResult } from '../middleware';
import TaskService from '../../service/taskService';
const taskService = new TaskService();


/**
 *  -------------------------
    Validaciones para title
    -------------------------
 */
const _titleRequired = check('title', 'Title required.').not().isEmpty();
const _titleIsString = check('title', 'Title must be a string.').isString();
const _optionalTitleIsString = check('title', 'Title must be a string.').optional().isString();
const _titleIsLength = body('title', 'Title size must be at least 12 characters.').isLength({min:12});
const _optionalTitleIsLength = body('title', 'Title size must be at least 12 characters.').optional().isLength({min:12});

const _titleIsUniqueFunction : CustomValidator = async(value) => {
    const tasksDB = await taskService.findAll();
    const titleDB = tasksDB.map((tasks) => tasks.title);
    if(titleDB.includes(String(value))) {
        throw new Error('Title is already in the database, must be unique.');
    }
};

const _titleIsUnique = body('title').custom(_titleIsUniqueFunction);
const _optionalTitleIsUnique = body('title').optional().custom(_titleIsUniqueFunction);

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
const _optionalExpirationDateRequired = check('expirationDate', 'ExpirationDate required.').optional().not().isEmpty();
const _expirationDateIsDate = check('expirationDate', 'ExpirationDate must be a date.').isDate();
const _optionalExpirationDateIsDate = check('expirationDate', 'ExpirationDate must be a date.').optional().isDate();

/**
 *  -----------------------
    Validaciones para id
    -----------------------
*/
const _idIsMongo = check('id').optional().isMongoId().withMessage('ID does not exist in DB');

// const idExistFunction : CustomValidator = async(id) => {
//     const userFound = await taskService.findById(<string>id);
//     if(userFound == null ) {
//         throw new Error('ID does not exist in DB');
//     }
// };

// const _idExist = body('id').optional().custom(idExistFunction);

    

export const getRequestValidations = [    
    validJWT,
    _idIsMongo,
    _validationResult
];


export const postRequestValidations = [
    validJWT,
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

export const putRequestValidations = [
    _idIsMongo,
    _optionalTitleIsString,
    _optionalTitleIsLength,
    _optionalTitleIsUnique,
    _descriptionIsString,
    _statusIsString,
    _statusValid,
    _optionalExpirationDateRequired,
    _optionalExpirationDateIsDate,
    _validationResult
];

export const deleteRequestValidations = [
    _idIsMongo,
    _validationResult
];
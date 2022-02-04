import {body,check,CustomValidator} from 'express-validator';
import { validJWT } from '../middleware';
import { _validationResult } from '../middleware';
import UserService from '../../service/userService';
const userService = new UserService();

/**
 *  -------------------------
    Validaciones para email
    -------------------------
 */

const _emailRequired = body('email', 'Email required.').not().isEmpty();
const _emailIsString = body('email', 'Email must be a string.').isString();
const _optionalEmailIsString = body('email', 'Email must be a string.').optional().isString();
const _emailIsEmail = body('email', 'Email must have a valid format.').isEmail();
const _optionalEmailIsEmail = body('email', 'Email must have a valid format.').optional().isEmail();

const _emailIsUniqueFunction : CustomValidator = async(value) => {
    const userDB = await userService.findAll();
    const emailDB = userDB.map((user) => user.email);
    if(emailDB.includes(String(value))){
        throw new Error('Email is already in the database, must be unique.');
    }
};

const _emailIsUnique = body('email').custom(_emailIsUniqueFunction);
const _optionalEmailIsUnique = body('email').optional().custom(_emailIsUniqueFunction);

/**
 *  --------------------------
    Validaciones para password
    --------------------------
 */
    
const _passwordRequired = body('password', 'Password required.').not().isEmpty();
const _passwordIsString = body('password', 'Password required.').isString();
const _optionalPasswordIsString = body('password', 'Password required.').optional().isString();

/**
 *  -----------------------
    Validaciones para id
    -----------------------
*/
const _idIsMongo = check('id').optional().isMongoId().withMessage('ID does not exist in DB');



export const userGetRequestValidations = [    
    validJWT,
    _idIsMongo,
    _validationResult

];


export const userPostRequestValidations = [
    validJWT,
    _emailRequired,
    _emailIsString,
    _emailIsEmail,
    _emailIsUnique,
    _passwordRequired,
    _passwordIsString,
    _validationResult
];

export const userPutRequestValidations = [
    validJWT,
    _optionalEmailIsString,
    _optionalEmailIsEmail,
    _optionalEmailIsUnique,
    _optionalPasswordIsString,
    _validationResult

];

export const userDeleteRequestValidations = [
    validJWT,
    _idIsMongo,
    _validationResult
];
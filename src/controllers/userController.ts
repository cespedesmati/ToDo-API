import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserType } from '../model/userModel';
import UserService from '../service/userService';
import { AppError } from '../utils/appError';
const userService = new UserService();


export const getUsers: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const users = await userService.findAll();
        response.json(users);
    } catch (error) {
        next(error);
    }
};

export const getUsersTasks : RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const usersTasks = await userService.findAllByTasks();
        response.json(usersTasks);
    } catch (error) {
        next(error);
    }
};

export const getUserById: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const {id}  = request.params;
        const user = await userService.findById(id);
        if (user != null){
            response.json(user);
        }else{
            throw new AppError('Id does not exist in DB',404);
        } 
    }catch (error) {
        next(error);
    }
};



export const createUser : RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const user = request.body as UserType;
        const userSaved = await userService.saveUser(user);
        response.json(userSaved);
    } catch (error) {
        next(error);
    }

};

export const updateUser: RequestHandler = async(request: Request, response: Response, next: NextFunction) =>{
    try {
        const {id}  = request.params;
        const bodyUser = <UserType>request.body;
        const updateUser = await userService.updateUser(id,bodyUser);
        if (updateUser != null){ //probar test sin if else, si es formato mongo el id pasa, return null
            response.send(updateUser);
        }else{
            throw new AppError('Id does not exist in DB',404);
        } 
    } catch (error) {
        next(error);
    }
};


export const deleteUser: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const {id}  = request.params;
        const deletedUser = await userService.deleteUser(id);
        if(deletedUser != null){
            response.json({message : `User with id: ${id} deleted.`});
        }else{
            throw new AppError('Id does not exist in DB',404);
        }
    } catch (error) {
        next(error);
    }
};
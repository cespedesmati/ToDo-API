import { Request, Response, NextFunction, RequestHandler } from 'express';
import { UserType } from '../model/userModel';
import UserService from '../service/userService';
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
            throw new Error('ID does not exist in DB');
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
        response.send(updateUser);
    } catch (error) {
        next(error);
    }
};


export const deleteUser: RequestHandler = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const {id}  = request.params;
        await userService.deleteUser(id);
        response.json({message : `User with id: ${id} deleted.`});
    } catch (error) {
        next(error);
    }
};
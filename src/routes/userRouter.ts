import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, getUsersTasks, updateUser } from "../controllers/userController";
import { userDeleteRequestValidations, userGetRequestValidations, userPostRequestValidations, userPutRequestValidations } from '../utils/validation/userValidation';

const userRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Crud for user.
 */


//GET
/**
 * @swagger
 * /users/:
 *  get:
 *      summary: get user information 
 *      description : For security, only the id and email of the users can be viewed.
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: users are obtained.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserGet'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 *              
 *                              
 *              
 */
userRouter.get('/',getUsers);

/**
 * @swagger
 * /users/detail:
 *  get:
 *      summary: get user information with their tasks.
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: users with tasks are obtained successfully.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserGetDetail'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 *              
 */
userRouter.get('/detail',getUsersTasks);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      summary: get user with specific id.
 *      tags: [Users]
 *      parameters:
 *          - $ref: '#/components/parameters/token'
 *          - $ref: '#/components/parameters/taskId'
 *      responses:
 *          200:
 *              description: users with specific id are obtained.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserGet'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 * 
 *          404:
 *              description: task not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 *              
 */
userRouter.get('/:id',userGetRequestValidations,getUserById);

//POST
userRouter.post('/',userPostRequestValidations,createUser);

//PUT
userRouter.put('/:id',userPutRequestValidations,updateUser);

//DELETE
userRouter.delete('/:id',userDeleteRequestValidations,deleteUser);




/**
 * @swagger
 * components:
 * 
 *  responses:
 * 
 *      ServerError:
 *          description: server error.
 * 
 *  parameters:
 *      token:
 *          in: header
 *          name: token
 *          description: token of logged in user
 *          schema:
 *              type: string
 *          required: true
 *      taskId:
 *          in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *              description: the task id
 * 
 *  schemas:
 *      TaskNotFound:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  description: message for not found task
 *          example:
 *              message: Task not found. 
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              tasks:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Task'
 *          example:
 *              email: matias@gmail.com
 *              password: pass123
 *      UserGet:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *              email:
 *                  type: string
 *          example:
 *              _id : 6156f84036b62ghb417l4e83
 *              email: example@gmail.com
 * 
 *      UserGetDetail:
 *          type: object
 *          properties:
 *              _id: 
 *                  type: string
 *              email:
 *                  type: string
 *              tasks:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Task'
 *          example:
 *              _id : 6156f84036b62ghb417l4e83
 *              email: example@gmail.com
 *              tasks: [{"_id": "9374f98","title": "example task 1"},{"_id": "6205c60","title": "example task 2"}]
 * 
 * 
 */

export default userRouter;
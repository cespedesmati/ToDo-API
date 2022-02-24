import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, getUsersTasks, updateUser } from "../controllers/userController";
import { userDeleteRequestValidations, userGetRequestValidations, userGetRequestValidationsTasks, userPostRequestValidations, userPutRequestValidations } from '../utils/validation/userValidation';

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
 *      security:
 *          - bearerAuth: []
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
userRouter.get('/detail', userGetRequestValidationsTasks, getUsersTasks);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: get user with specific id.
 *      tags: [Users]
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      responses:
 *          200:
 *              description: users with specific id are obtained.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserGet'
 *          400:
 *              description: Id is invalid.
 * 
 *          404:
 *              description: Id does not exist in DB.
 *              
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRouter.get('/:id',userGetRequestValidations,getUserById);

//POST
/**
 * @swagger
 * /users/:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: create a new user
 *      description: after creating the user you will receive your encrypted password and an empty array of tasks
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: user created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserPost'
 *          400:
 *              description: required fields are not completed or data is invalid.
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRouter.post('/',userPostRequestValidations,createUser);

//PUT
/**
 * @swagger
 * /users/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: update a user by id.
 *      description: 
 *      tags: [Users]
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: successfully updated user.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UserGet'
 *          400:
 *              description:  data fields or id are invalid.
 *          404:
 *              description: Id does not exist in DB.
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRouter.put('/:id',userPutRequestValidations,updateUser);

//DELETE
/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: get an id and delete user.
 *      tags: [Users]
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      responses:
 *          200:
 *              description: user found and successful delete.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: User with id 6216654c36ac6ddbd0890930 deleted.
 *          400:
 *              description: Id is invalid.
 * 
 *          404:
 *              description: Id does not exist in DB.
 *              
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
userRouter.delete('/:id',userDeleteRequestValidations,deleteUser);




/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth: 
 *          type: http
 *          scheme: bearer
 *          bearerAuth: JWT
 * 
 *  security:
 *      - bearerAuth: []
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
 *      Id:
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
 *      UserPost:
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
 *              _id:
 *                  type: string
 *          example:
 *              email: example@gmail.com
 *              password: 482h82h1783g123h271238h412
 *              tasks: []
 *              _id: 6428a342ac6jdkf38463923
 * 
 *      User:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          example:
 *              email: example@gmail.com
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
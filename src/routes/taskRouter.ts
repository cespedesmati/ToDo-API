import { Router } from 'express';
import {getTasks,createTask, getTaskById, updateTask, deleteTask, getTasksUsers} from '../controllers/taskControllers';
import { deleteRequestValidations, getRequestValidations, postRequestValidations, putRequestValidations } from '../utils/validation/taskValidation';
const taskRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Crud for task.
 */


//GET
/**
 * @swagger
 * /tasks/:
 *  get:
 *      summary: get task information 
 *      tags: [Tasks]
 *      responses:
 *          200:
 *              description: tasks are obtained.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          500:
 *              $ref: '#/components/responses/ServerError'            
 */
taskRouter.get('/', getTasks);


/**
 * @swagger
 * /tasks/detail:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: get task information with user info.
 *      tags: [Tasks]
 *      responses:
 *          200:
 *              description: task with user are obtained successfully.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskDetail'
 *          500:
 *              $ref: '#/components/responses/ServerError'
 *              
 */
taskRouter.get('/detail',getTasksUsers);

/**
 * @swagger
 * /tasks/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: get task with specific id.
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      responses:
 *          200:
 *              description: task with specific id are obtained.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          400:
 *              description: Id is invalid.
 * 
 *          404:
 *              description: Id does not exist in DB.
 *              
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
taskRouter.get('/:id', getRequestValidations, getTaskById);

//POST
/**
 * @swagger
 * /tasks/:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: create a new task
 *      tags: [Tasks]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskPost'
 *      responses:
 *          200:
 *              description: task created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          400:
 *              description: required fields are not completed or data is invalid.
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
taskRouter.post('/', postRequestValidations, createTask);

//PUT
/**
 * @swagger
 * /tasks/{id}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: update a task by id.
 *      description: can update, title, description, expiration date and change status to completed.
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TaskPut'
 *      responses:
 *          200:
 *              description: successfully updated task.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Task'
 *          400:
 *              description: data fields or id are invalid.
 *          404:
 *              description: Id does not exist in DB.
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
taskRouter.put('/:id', putRequestValidations, updateTask);

//DELETE
/**
 * @swagger
 * /tasks/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: get an id and delete task.
 *      tags: [Tasks]
 *      parameters:
 *          - $ref: '#/components/parameters/Id'
 *      responses:
 *          200:
 *              description: task found and successful delete.
 *              content:
 *                  aplication/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                          example:
 *                              message: Task with id 6216654c36ac6ddbd0890930 deleted.
 *          400:
 *              description: Id is invalid.
 * 
 *          404:
 *              description: Id does not exist in DB.
 *              
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
taskRouter.delete('/:id',deleteRequestValidations, deleteTask);

/**
 * @swagger
 * components:
 * 
 *  schemas:
 *      Task:
 *          type: object
 *          properties:
 *              id:
 *                  type:string
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *              expirationDate:
 *                  type: string
 *              user:
 *                  type: object
 *          example:
 *              id: 621440395d7cfbc5f503d623
 *              title: Ir a la panaderia
 *              description: Comprar 1/2 docena de factutas, una tarta de membrillo y 1kg de pan
 *              status: In progress
 *              expirationDate: 2023-01-05
 *              user: 6424d52391b62fwe436d4e34
 * 
 *      TaskPost:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              expirationDate:
 *                  type: string
 *          example:
 *              title: new example task
 *              description: creating a task from swagger
 *              expirationDate: 2024-05-24
 * 
 *      TaskDetail:
 *          type: object
 *          properties:
 *              id:
 *                  type:string
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *              expirationDate:
 *                  type: string
 *              user:
 *                  type: object
 *          example:
 *              id: 621440395d7cfbc5f503d623
 *              title: Ir a l gimnasio
 *              description: ejecitar piernas y hombros
 *              status: In progress
 *              expirationDate: 2022-05-12
 *              user: {"_id": "321das41", "email": "example@gmail.com" }
 * 
 * 
 *      TaskPut:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *              expirationDate:
 *                  type: date
 *          example:
 *              title: update title with swagger
 */

export default taskRouter;



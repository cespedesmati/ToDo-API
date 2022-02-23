import { Router } from 'express';
import {getTasks,createTask, getTaskById, updateTask, deleteTask, getTasksUsers} from '../controllers/taskControllers';
import { deleteRequestValidations, getRequestValidations, postRequestValidations, putRequestValidations } from '../utils/validation/taskValidation';
const taskRouter = Router();

//GET
taskRouter.get('/', getTasks);
taskRouter.get('/detail',getTasksUsers);
taskRouter.get('/:id', getRequestValidations, getTaskById);

//POST
taskRouter.post('/', postRequestValidations, createTask);

//PUT
taskRouter.put('/:id', putRequestValidations, updateTask);

//DELETE
taskRouter.delete('/:id',deleteRequestValidations, deleteTask);

/**
 * @swagger
 * components:
 * 
 *  schemas:
 *      Task:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *              description:
 *                  type: string
 *              status:
 *                  type: string
 *              expirationDate:
 *                  type: string
 *              user:
 *                  $ref: '#/components/schemas/User'
 *          example:
 *              title: Ir a comprar pan
 *              status: In progress
 *              expirationDate: 2023-01-05
 */

export default taskRouter;



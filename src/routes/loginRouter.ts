import { Router } from "express";
import { loginUser } from "../controllers/loginController";
import { loginReQuestValidations } from "../utils/validation/userValidation";

const loginRouter = Router();

/**
 * @swagger
 * tags:
 *  name: Login
 *  description: login user to get token.
 */


/**
 * @swagger
 * /login/:
 *  post:
 *      summary: get token.
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: user logged in successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginToken'
 *          400:
 *              description: required fields are not completed or data is invalid.
 *          401:
 *              description: data is wrong.
 *          500:
 *              $ref: '#/components/responses/ServerError'
 */
loginRouter.post('/',loginReQuestValidations,loginUser);


/**
 * @swagger
 * components:
 *  schemas:
 *      Login:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          example:
 *              email: admin@gmail.com
 *              password: password12356
 * 
 *      LoginToken:
 *          type: object
 *          properties:
 *              token:
 *                  type: string
 *              email:
 *                  type: string
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDVjNjA2ODhiNjJlZGI0MzZkNGU1OSIsImlhdCI6MTY0NTY2NjE5MSwiZXhwIjoxNjQ1NjY5NzkxfQ.bHwDy6lpe9kDSFyFk2OF0Y7zuVyrCtawMjw6IEF0Txg
 *              email: userLogged@gmail.com
 *              
 */

export default loginRouter;
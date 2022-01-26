import express  from "express";

const pruebaRouter = express.Router();

pruebaRouter.get('/',(request,response) => {
    response.send('Hola Mundo');
});

export default pruebaRouter;
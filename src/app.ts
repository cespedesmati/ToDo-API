/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express from 'express';
import pruebaRouter from './routes/pruebaRouter';
import taskRouter from './routes/taskRouter';
import morgan from 'morgan';
import logger from './utils/logger';
import config from './utils/config';
import mongoose from 'mongoose';
import {errorHandler } from './utils/appError';
import userRouter from './routes/userRouter';
import loginRouter from './routes/loginRouter';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {options} from './utils/swaggerOptions';
const specs = swaggerJsDoc(options);
const app = express();

logger.info(`connecting to${String(config.MONGODB_URI)}`);
mongoose.connect(String(process.env.MONGODB_URI))
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error);
});
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api',pruebaRouter);
app.use('/login',loginRouter);
app.use('/users',userRouter);
app.use('/tasks',taskRouter);
app.use('/docs',swaggerUI.serve, swaggerUI.setup(specs));

app.use(errorHandler);


export default app;


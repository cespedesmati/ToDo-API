
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

const app = express();

logger.info(`connecting to${String(config.MONGODB_URI)}`);
//mongoose.connect(String(config.MONGODB_URI))
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

app.use(errorHandler);


export default app;


import express from 'express';
import pruebaRouter from './routes/pruebaRouter';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api',pruebaRouter);

export default app;


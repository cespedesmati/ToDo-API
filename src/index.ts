import http, { RequestListener } from 'http';
import app from './app';
import config  from './utils/config';
import logger from './utils/logger';

const server = http.createServer(<RequestListener>app);

server.listen(config.port, () => {
    logger.info(`Server running on port ${String(config.port)}`);
});




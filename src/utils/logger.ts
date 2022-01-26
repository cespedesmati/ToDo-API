import winston from 'winston';
import config from './config';

const transports = [];

transports.push(
    new winston.transports.Console({
        format: winston.format.simple()})
);

const loggerInstance = winston.createLogger({
    level: config.log.level,
    transports
});

export default loggerInstance;
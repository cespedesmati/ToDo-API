import 'dotenv/config';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: process.env.PORT,
    log:{
        level:process.env.LOG_LEVEL
    }
};


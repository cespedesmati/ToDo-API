import 'dotenv/config';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: process.env.PORT,
    log:{
        level:process.env.LOG_LEVEL
    },
    MONGODB_URI: process.env.MONGODB_URI,
    auth: {
        secret: process.env.AUTH_SECRET as string,
        ttl: process.env.AUTH_TTL
    }
};


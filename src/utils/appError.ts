
import { ErrorRequestHandler} from "express";
import loggerInstance from "./logger";


export class AppError extends Error {
    public code: number;
    public data: string;
    constructor(message: string | undefined,code : number, data: string){
        super(message);
        this.code = code;
        this.data = data;
    }
}

export const errorHandler: ErrorRequestHandler = (err:AppError,req,res,_next) => {
    const code = err.code || 500;
    loggerInstance.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    loggerInstance.error(err.stack);

    res.status(code);
    const body = {
        error:{
            code,
            message: err.message,
            detail: err.data
        }
    };
    res.json(body);
};

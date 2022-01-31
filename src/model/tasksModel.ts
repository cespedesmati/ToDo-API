import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface TaskType extends mongoose.Document{
    title:string,
    description:string,
    status:string,
    expirationDate:Date,
    user: mongoose.Schema.Types.ObjectId
}

const taskSchema = new mongoose.Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    status: {
        type: String,
        default: 'in progress'
    },
    expirationDate:{
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

taskSchema.plugin(uniqueValidator , {message:' already exist in DB'});

const Task = mongoose.model<TaskType>('Task',taskSchema);

export default Task;
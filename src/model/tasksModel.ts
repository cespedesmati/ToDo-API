import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

enum Status {
    inProgress = 'In progress',
    completed = 'Completed'
}
export interface TaskType extends mongoose.Document{
    title:string,
    description:string,
    status:Status,
    expirationDate:Date,
    user: mongoose.Schema.Types.ObjectId
}

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        minlength: 12,
        required: [true, 'Title required.'],
        unique: true
    },
    description:{
        type: String
    },
    status: {
        type: String,
        default: 'In progress',
        enum:['In progress', 'Completed']
    },
    expirationDate:{
        type: Date,
        required: [true, 'Expiration date required.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

taskSchema.plugin(uniqueValidator , {message:' already exist in DB'});

const Task = mongoose.model<TaskType>('Task',taskSchema);

export default Task;
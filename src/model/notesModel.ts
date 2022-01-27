import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const taskSchema = new Schema({
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
    }
});

taskSchema.plugin(uniqueValidator , {message:' already exist in DB'});

export default mongoose.model('tasks',taskSchema);
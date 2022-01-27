import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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

export default mongoose.model('Task',taskSchema);
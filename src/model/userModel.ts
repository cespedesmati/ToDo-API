import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface UserType extends mongoose.Document{
    email:string,
    password:string,
    tasks:mongoose.Schema.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email required.'],
        unique: true,
        minlength: 12
    },
    password: {
        type: String,
        minlength: 8
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: []
    }]
});


userSchema.plugin(uniqueValidator , {message:' already exist in DB'});


const User = mongoose.model<UserType>('User',userSchema);

export default User;
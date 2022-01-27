import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true,'Email required.'],
        unique: true,
        minlength: 12
    },
    passwordCrypt: {
        type: String,
        minlength: 8
    },
    tasks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }
});


userSchema.plugin(uniqueValidator , {message:' already exist in DB'});

export default mongoose.model('User',userSchema);
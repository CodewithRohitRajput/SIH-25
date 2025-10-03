import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    age : String,
    designation : String,
    phonenumber : Number,
    unit : String,
    secretId : String,
    role : {
        type : String,
        enum : ['army' , 'admin'],
        default : "army"
    }
})

export default mongoose.model('signup' , UserSchema);
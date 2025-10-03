import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () =>{
     mongoose.connect(process.env.MONGODB as string)
     .then(()=>{
        console.log("MongoDB Connected Successfully");
     })
     .catch(()=>{
        console.log("MongoDB Connection Failed")
     })
}

export default connectDB;
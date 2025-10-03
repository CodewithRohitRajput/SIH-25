import mongoose from 'mongoose';

const IllegalAppSchema = new mongoose.Schema({
    appName : String,
    websiteName : String,
    title : String,
   description : String
})

export default mongoose.model('riskApp' , IllegalAppSchema);
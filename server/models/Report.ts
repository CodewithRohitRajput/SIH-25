import mongoose from 'mongoose';
const ReportSchema = new mongoose.Schema({
    title : String,
    description : String,
    category : String,
    location : String,
    status : {
        type : String,
        enum : ["pending" , "approved" , "rejected"],
        default : "pending"
    },
    createdBy : {
        type : String
        
    }
})

export default mongoose.model('report' , ReportSchema);
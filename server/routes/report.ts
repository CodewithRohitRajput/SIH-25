import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import Report from '../models/Report';
const router = express.Router();
dotenv.config();

const SECRET=process.env.SECRET;
if(!SECRET){
    throw new Error("SECRET is not present in the env");
};



router.post('/do' , async (req , res)=>{
    const token = req.cookies.token;
    const decoded = await jwt.verify(token , SECRET) as {userId : string} ;
    const user = await User.findById(decoded.userId);
    if(!user) return res.status(401).json({message : "No user found"});
    const useremail = user.email;
    const {title , description , category , location , status} = req.body;

    const newReport = new Report({title , description , category , location , status , createdBy : useremail });

    await newReport.save();
    return res.status(200).json({message : "Report has been successfully done "})

})

router.get('/get' , async (req , res) =>{
    const reports = await Report.find();
    return res.json({reports})
})




export default router;
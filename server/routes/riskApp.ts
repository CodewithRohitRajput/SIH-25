import express from 'express';
import User from '../models/User';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import IllegalApp from '../models/IllegalApp';
dotenv.config();
const router = express.Router();

const SECRET=process.env.SECRET;

if(!SECRET){
    throw new Error ("SECRET is not setup in the env");
}

router.post('/do' , async (req , res)=>{
    const {appName , websiteName , title , description} = req.body;
    const newRisk = new IllegalApp({appName , websiteName , title , description});
    await newRisk.save();
    res.status(200).json({message : "New Risk website is reported"});

})

router.get('/get' , async (req , res)=>{
    const data = await IllegalApp.find();
    return res.status(200).json({data});
})





export default router;
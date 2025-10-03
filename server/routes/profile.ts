import express from 'express';
import User from '../models/User';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();
const router = express.Router();

const SECRET=process.env.SECRET;

if(!SECRET){
    throw new Error ("SECRET is not setup in the env");
}

router.get('/me' , async (req , res)=>{
    const token = req.cookies.token;
    if(!token) return res.status(404).json({message : "Token not found"});
    const decoded = jwt.verify(token , SECRET) as {id : string};
    if(!decoded) return res.status(401).json({message : "Token is not correct"});
    const userId = (decoded as any).userId;
    const profile = await User.findById(userId)

    return res.json({profile});
})

export default router;

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
const router = express.Router();
dotenv.config();

const SECRET=process.env.SECRET;
if(!SECRET){
    throw new Error("SECRET is not present in the env");
};

router.post('/register' , async (req , res)=>{
      console.log('Register route hit with:', req.body);
    const {username , email , password , age , designation , phonenumber , unit , secretId , role} = req.body;

    const isUser = await User.findOne({phonenumber});
    if(isUser) return res.status(401).json({message : "User Already Exists"});

    const hashPass = await bcrypt.hash(password , 10);

    const newUser = new User({username , email , password : hashPass , age , designation , phonenumber , unit , secretId , role  });

    await newUser.save();

    const token = await jwt.sign({userId : newUser._id} , SECRET);

    res.cookie('token' , token , {
        httpOnly : true,
        sameSite : 'lax',
        path : '/',
        maxAge : 3600000,
        secure : false
    })
    return res.status(201).json({message: "User registered successfully" , token});
})



router.post('/login' , async (req , res)=>{
    const { email , password , phonenumber , secretId , } = req.body;

    const isUser = await User.findOne({email , phonenumber , secretId}) as any;
    if(!isUser) return res.status(401).json({message : "User Does not Exists"});
    if (!isUser.password) {
    return res.status(400).json({ message: "Password not set for this user." });
}

    // const hashPass = await bcrypt.hash(password , 10);
    const isPass = await bcrypt.compare(password , isUser.password);
    if(!isPass) return res.status(401).json({message : "Password is wrong"});

    // const newUser = new User({  email , password, secretId   });

    // await newUser.save();

    const token = await jwt.sign({userId : isUser._id} , SECRET);

    res.cookie('token' , token , {
        httpOnly : true,
        sameSite : 'lax',
        path : '/',
        maxAge : 3600000,
        secure : false
    })
    return res.status(200).json({message: "Login successful" , token}); 
})

router.post('/token' , async (req , res)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({loggedIn : false});

     return res.status(200).json({loggedIn : true , token});
})

router.post('/logout' , async (req , res)=>{
    res.clearCookie('token' , {path : '/'});
    return res.status(200).json({message : "Logged Out Successfully"})
})

router.post('/isAdmin' , async (req , res) =>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({message : "Token is not found"});
    const decoded = jwt.verify(token , SECRET) as {userId : string};
    const user = await User.findById(decoded.userId);
    if(!user) return res.status(401).json({isAdmin : false});
    return res.status(200).json({isAdmin : user.role === 'admin'});
})

export default router;




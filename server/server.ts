import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db'
import auth from './routes/auth'
import cookieParser from 'cookie-parser';
import profile from './routes/profile'
import report from './routes/report'
import geminiAI from './routes/gemini'
import riskApp from './routes/riskApp'

const port = 5002;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'https://6sqk83g6-3000.inc1.devtunnels.ms'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
connectDB();




app.use('/auth' , auth);
app.use('/profile' , profile);
app.use('/report' , report);
app.use('/gemini' , geminiAI)
app.use('/risk' , riskApp);



app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
})
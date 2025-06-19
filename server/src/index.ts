import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import allRoutes from "./routes/index";
import cors from 'cors';
import cookieParser from "cookie-parser";
// import MediaDeviceInfo from ''
const app = express();
const PORT = 5000;
configDotenv();
app.use(cookieParser());
app.use(cors())
app.use(express.json())
app.use("/",allRoutes)

// app.use('/api/v1',userRoutes)
mongoose.connect(process.env.DB_URL as string)
app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`)
    
    console.log();
    
})
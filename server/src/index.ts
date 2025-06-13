import express, { Request, Response } from "express";
const app = express();
const PORT = 5000
import userRoutes from "./routes/user"
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
app.get('/',(req:Request,res:Response)=>{
    res.send("this is from backend server of port 5000")
    
})

app.use('/api/v1',userRoutes)
mongoose.connect(process.env.DB_URL as string)
app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`)
    console.log(process.env.DB_URL)
})
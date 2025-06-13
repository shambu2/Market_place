import express, { Request, Response } from "express";
const app = express();
const PORT = 5000
import userRoutes from "./routes/user"
app.get('/',(req:Request,res:Response)=>{
    res.send("this is from backend server of port 5000")
    
})

app.use('/api/v1',userRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`)
})
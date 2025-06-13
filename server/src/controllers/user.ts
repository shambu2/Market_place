import { Request, Response } from "express";

export const getUser = (req:Request,res:Response)=>{
    res.send("this is from controller via router ")
}
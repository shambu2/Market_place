import express, { Request, Response, Router } from "express";
const router = Router();
import bcrypt from "bcrypt";
import { User } from "../models";

router.get("/", (req, res) => {
  res.send("hellow from routes");
});

router.post("/register", async(req: Request, res: Response) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = new User({email,password:hashedPassword});
    await newUser.save();
    res.status(200).json({newUser})
  } catch (error:any) {
    res.status(500).send('Error while registering User'+ error.message)
  }
});

export default router;

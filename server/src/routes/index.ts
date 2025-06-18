import express from "express";
import { Request, Response } from "express";
// const router = express.Router();
import bcrypt from "bcrypt";
import { User } from "../models";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { error } from "console";
const router = express.Router();
router.get("/", async (req: Request, res: Response) => {
  res.json("hellow from routes");
});

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ newUser });
  } catch (error: any) {
    res.status(500).send("Error while registering User" + error.message);
  }
});
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  try {
    if (!user) {
      res.status(401).send("user not exists");
      return;
    }
    const passwordCorrect = bcrypt.compareSync(
      password,
      user?.password as string
    );
    if (!passwordCorrect) {
      res.status(404).send("Enter correct Password");
      return;
    }
    const token = jwt.sign({ id: user?.id }, "nothing_is_secret_key", {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful" });
    return;
  } catch (error) {
    res.status(401).json("error while logging in ");
    return;
  }
});

const storage = multer.diskStorage({
  destination: function (req,file,cb){
    cb(null,'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()* 1E9);
    const extensionName = path.extname(file.originalname).toLowerCase();
    cb(null,uniqueSuffix + extensionName )
  },
})
const upload = multer({storage: storage})
router.post('/admin/new',upload.array('images',10),(req:Request,res:Response)=>{
  const {title,summary,price,size} = req.body;
  const files = req.files;

  if(!title || !summary || !price){
     res.status(400).json({error:"Fill all fields"})
     return;
  }
  if(!files || files.length === 0){
     res.status(400).json({error: "at least one image must be uploaded"})
     return;
  }

})

export default router;

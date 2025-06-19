import express from "express";
import { Request, Response } from "express";
// const router = express.Router();
import bcrypt from "bcrypt";
import {  Customers, Item, User } from "../models";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { Types } from "mongoose";
const jwt_secrete = "nothing_is_secret_key";
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

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
    const token = jwt.sign({ id: user?.id }, jwt_secrete, {
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
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extensionName = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + extensionName);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/admin/new",
  upload.array("images", 10),
  async (req: Request, res: Response) => {
    try {
      const { title, summary, price } = req.body;
      const files = req.files as Express.Multer.File[];
      const token = req.cookies?.token;
      // let decoded: {id: string};
      // const decoded = jwt.verify(token,jwt_secrete) as {id: string}
      let userInfo;
      if (!token) {
        res.status(401).json({ message: "login maadi " });
        return;
      }
      try {
        const decoded = jwt.verify(token, jwt_secrete) as { id: string };
        userInfo = await User.findById(decoded.id);
        req.userId = userInfo?.id;
        if (!userInfo) {
          res.status(404).json({ message: "user not found" });
        }
      } catch (error) {
        res.status(403).json({ message: "invalid token" });
      }

      if (!title || !summary || !price) {
        res.status(400).json({ error: "Fill all fields" });
        return;
      }
      if (!files || files.length === 0) {
        res.status(400).json({ error: "at least one image must be uploaded" });
        return;
      }
      const imagePaths: string[] = files.map((file) => file.path);

      const item = new Item({
        title,
        summary,
        price,
        images: imagePaths,
        owner: userInfo?.id,
      });
      const savedItem = await item.save();
      res.status(201).json({
        message: "Product saved to user",
        item: savedItem,
      });
      return;
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
router.get("/listing", async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const itemList: string[] = await Item.find({ owner: userId });
    res
      .status(200)
      .json({ message: "here is listing of products", items: itemList });
  } catch (error) {}
});

router.put("/item/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!Types.ObjectId.isValid(id)) {
    res.status(400).send("Invalid ObjectId");
    return;
  }
  const Id = new Types.ObjectId(id);
  const { title, summary, price } = req.body || {} ;
  const files = req.files;
  // if(!title || !summary || !price){
  //   res.status(400).json("Fill all fields")
  //   return;
  // }
  try {
    // const item = await Item.findById(req.params.id);
    // res.status(200).json(item)
    const updatedItem = await Item.findByIdAndUpdate(
      Id,
      { title, summary, price },
      {new:true}
    );
    if (!updatedItem) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(updatedItem);
    return;
  } catch (error) {
    res.status(500).json({ message: "bad request from user" });
  }
});

router.post("/customer/register",async(req:Request,res:Response)=>{
   const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const userExist = await Customers.findOne({email})
    if(userExist){
      res.status(404).json("User exist please login")
      return;
    }
    const user = new Customers({email,password:hashedPassword});
    await user.save();
    res.status(201).json({message:'User created',user})
    return;
  } catch (error) {
    res.status(500).json("Error while registering User" );
    return;
  }
  // console.log(hashedPassword)

})



export default router;

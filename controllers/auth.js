import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

///Register User ///
export const register = async (req,res,next) => {
    try{
const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    } = req.body
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password,salt)
     //another way to hash
        //this.password = await bcrypt.hash(this.password, 12); // await hash is async
        //hash the passsword with cost of 12  hashing start with 8 then 10-12

    const newUser = new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
    picturePath
    })
    const savedUser = await newUser.save()
   res.status(201).json({
    status:"success",
    savedUser
   })
    } catch (err){
    res.status(500).json({error:err.message})
    }
}

//logging in
export const login = async (req,res,next) =>{
try {
const { email, password} = req.body
const user = await User.findOne({email:email})
if(!user) return res.status(400).json({message:"user doesn't exist"})
const isMatch = await bcrypt.compare(password,user.password)
if(!isMatch) return res.status(400).json({message:"Password Incorrect please try again "})
const token = jwt.sign({id: user._id},process.env.JWT_SECRET)
delete user.password;
res.status(200).json({token,user})
} catch(err){
    res.status(500).json({error:err.message})
}
}
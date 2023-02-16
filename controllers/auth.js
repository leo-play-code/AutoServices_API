import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* LOGGING IN */
export const login = async(req,res) =>{
    try {
        res.setHeader("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {email} = req.body;
        const user = await User.findOne({email:email})
        if (!user) return res.status(400).json({msg:"User does have permission. "});
        const token = ((user.allow==true)?(jwt.sign({id:user._id},process.env.JWT_SECRET)):null)
        res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({error:error.message+'test'});
    }
}


export const register = async(req,res)=>{
    try {
        res.setHeader("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {
            Name,
            email,
            picturePath
        } = req.body;

        const newUser = new User({
            Name,
            email,
            picturePath
        });

        const savedUser = await newUser.save();
        const token = await ((savedUser.allow==true)?(jwt.sign({id:savedUser._id},process.env.JWT_SECRET)):null)
        res.status(200).json({token,savedUser});
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}



import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendVerfiyMail } from "../index.js";

/* LOGGING IN */
export const login = async(req,res) =>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {email,password} = req.body;
        const user = await User.findOne({email:email})
        if (!user) return res.status(400).json({error:"User does't exist. "});
        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(201).json({msg:"輸入密碼錯誤"});
        }
        if (user.allow===false) return res.status(201).json({msg:"Not Allow"});
        const token = await ((user.allow==true)?(jwt.sign({id:user._id},process.env.JWT_SECRET)):null)
        res.status(200).json({token,user});
    } catch (error) {
        res.status(500).json({error:error.message+'test'});
    }
}


export const register = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {
            Name,
            email,
            picturePath,
            password
        } = req.body;
        console.log('req.body',req.body)
        const newUser = new User({
            Name,
            email,
            picturePath,
            password
        });

        const savedUser = await newUser.save();
        const token = await ((savedUser.allow==true)?(jwt.sign({id:savedUser._id},process.env.JWT_SECRET)):null)
        res.status(200).json({token,savedUser});
        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
function generateRandomNumber() {
    var data = Math.floor(Math.random() * 900000) + 100000;
    data = data.toString()
    return data
}
  


  


export const sendVerifyNumber = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` );
        const {email} = req.params;
        const user = await User.findOne({email:email});
        const {htmlbody} = req.body;
        if (!user) return res.status(400).json({error:"User does't exist. "});
        const mailOptions = {
            from: 'ddmtestanswer@gmail.com',
            to: email,
            subject: 'Test email',
            html: htmlbody
        };
        sendVerfiyMail(mailOptions)
        res.status(200).json({"verifynumber":""})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const resetpassword = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {account,password } = req.body;
        const user = await User.findOne({email:account});
        if (!user) return res.status(400).json({error:"User does't exist. "});
        user.password = password;
        await user.save();
        res.status(200).json({"msg":"重置密碼成功"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


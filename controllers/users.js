import User from "../models/User.js";

export const getUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message});   
    }
}

export const updatesetting = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        user.setting = req.body;
        user.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(404),json({error:error.message})
    }
}

export const getAllUser = async(req,res)=>{
    try {
        // const UserList = await User.find({allow:true}).sort({name:'asc'});
        const UserList = await User.find().sort({name:'asc'});
        res.status(201).json(UserList)
    } catch (error) {
        res.status(404).json({error:error.message})   
    }
}
import User from "../models/User.js";

export const GetOne = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {id} = req.params;
        const user = await User.findById(id).lean();
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message});   
    }
}

export const UpdateSetting = async(req,res)=>{
    try {
        console.log('user body',req.body)
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {id} = req.params;
        const user = await User.findById(id)
        user.setting = req.body;
        user.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const GetAll = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        // const UserList = await User.find({allow:true}).sort({name:'asc'});
        const UserList = await User.find().sort({name:'asc'}).select(["Name","picturePath"]).lean();
        res.status(201).json(UserList)
    } catch (error) {
        res.status(404).json({error:error.message})   
    }
}
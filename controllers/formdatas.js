import jwt from "jsonwebtoken";
import FormData from "../models/FormData.js";
import FormModel from "../models/FormModel.js";
import User from "../models/User.js";

export const createform = async(req,res)=>{
    try {
        const {userid,formmodelid} = req.params;
        const data = req.body;
        const form = formmodelid;
        const creator = userid;
        const newformdata = new FormData({
            form,
            creator,
            data
        });
        await newformdata.save();
        const formlist = await FormData.find().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formlist);

    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const deleteform = async(req,res)=>{
    try {
        const {id} = req.params;
        const formdata = await FormData.findOne({_id:id});
        await formdata.delete();
        const formlist = await FormData.find().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const updateform = async(req,res)=>{
    try { 
        const {userid,formdataid} = req.params;
        const data = req.body;
        const formdata = await FormData.findOne({_id:formdataid});
        formdata.data = data;
        await formdata.save();
        const formlist = await FormData.find().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const updateformcomments = async(req,res)=>{
    try {
        const {id} = req.params
        const data = req.body;
        const form = await FormData.findOne({_id:id});

        form.comments.push(data);
        await form.save()
        const formlist = await FormData.find().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const getform = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const getallform = async(req,res)=>{
    try {
        const formlist = await FormData.find().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const getmyformdata = async(req,res)=>{
    try {
        const {userid} = req.params;
        const user = await User.findOne({_id:userid});
        const myformlist = await FormData.find({creator:user}).sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});

        res.status(201).json(myformlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


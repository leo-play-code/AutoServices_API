import FormData from "../models/FormData.js";
import FormModel from "../models/FormModel.js";
import User from "../models/User.js";

export const Create = async(req,res)=>{
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
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(newformdata);

    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const Delete = async(req,res)=>{
    try {
        const {id} = req.params;
        const formdata = await FormData.findOne({_id:id});
        await formdata.delete();
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json({'pass':'pass'})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const Update = async(req,res)=>{
    try { 
        const {userid,formdataid} = req.params;
        const data = req.body;
        const formdata = await FormData.findOne({_id:formdataid});
        formdata.data = data;
        await formdata.save();
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formdata)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const CreateComment = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        const form = await FormData.findOne({_id:id});

        form.comments.push(data);
        await form.save()
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(form)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}



export const UpdateComment = async(req,res)=>{
    try {
        const {id} = req.params;
        const data = req.body;
        const form = await FormData.findOne({_id:id});
        form.comments = data;
        await form.save();
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(form);
    } catch (error) {
        res.status(404).json({error:error.message})   
    }
}




export const GetOne = async(req,res)=>{
    try {
        const {id} = req.params;
        const formdata = await FormData.findOne({_id:id});
        res.status(201).json(formdata);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const GetAll = async(req,res)=>{
    try {
        const formall = await FormData.find()
        const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(formlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export const GetFormModelAll = async(req,res)=>{
    try {
        const {formid} = req.params;
        const form = await FormModel.findOne({_id:formid});
        const myformlist = await FormData.find({form:form}).lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(myformlist)
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export const GetUserAll = async(req,res)=>{
    try {
        const {userid} = req.params;
        const user = await User.findOne({_id:userid});
        const myformlist = await FormData.find({creator:user}).lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});

        res.status(201).json(myformlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


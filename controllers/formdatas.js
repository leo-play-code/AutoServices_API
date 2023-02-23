import FormData from "../models/FormData.js";
import FormModel from "../models/FormModel.js";
import User from "../models/User.js";


export const Create = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
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
        const returnform = await FormData.findOne({_id:newformdata['_id']}).lean().populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(returnform);
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});

    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const Delete = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
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
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {userid,formdataid} = req.params;
        const data = req.body;
        const formdata = await FormData.findOne({_id:formdataid});
        const user = await User.findOne({_id:userid})


        const compdata = {}
        var compdatabool = false
        for (const num in formdata['data']){
            if (data[num]!==formdata['data'][num]){
                console.log('num',num,formdata['data'][num])
                compdata[num] = {
                    "orignal":formdata['data'][num],
                    "now":data[num]
                }
                compdatabool = true
            }
        }
        const history = {"user":user.Name,"data":compdata}
        // console.log('history',history)
        formdata.data = data;
        if (compdatabool){
            formdata.history.push(history)
        }
        await formdata.save();
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        const returnform = await FormData.findOne({_id:formdataid}).lean().populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(returnform)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const CreateComment = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {id} = req.params;
        const data = req.body;
        const form = await FormData.findOne({_id:id});

        form.comments.push(data);
        await form.save()
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        const returnform = await FormData.findOne({_id:id}).lean().populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(returnform)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}



export const UpdateComment = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {id} = req.params;
        const data = req.body;
        const form = await FormData.findOne({_id:id});
        form.comments = data;
        await form.save();
        // const formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        const returnform = await FormData.findOne({_id:id}).lean().populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(returnform);
    } catch (error) {
        res.status(404).json({error:error.message})   
    }
}




export const GetOne = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {id} = req.params;
        const formdata = await FormData.findOne({_id:id});
        res.status(201).json(formdata);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const GetFormModelPart = async(req,res) =>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {skip,limit} = req.params;

        const myformlist = await FormData.find().lean().sort([['createdAt', -1]]).skip(skip).limit(limit).populate({path:"history"}).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(myformlist)
    } catch (error) {
        console.log('error',error.message)
        res.status(404).json({error:error.message})   
    }
}


export const GetAll = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {time} = req.params;
        // console.log(typeof time,time)
        // const formall = await FormData.find()
        if (parseInt(time)===0){
            var formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        }else{
            var formlist = await FormData.find({updatedAt: { $gt: parseInt(time) }}).lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        }
        
        console.log(formlist)
        res.status(201).json(formlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export const GetFormModelAll = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {formid} = req.params;
        const form = await FormModel.findOne({_id:formid});
        const myformlist = await FormData.find({form:form}).lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        res.status(201).json(myformlist)
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
export const GetUserAll = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {userid} = req.params;
        const user = await User.findOne({_id:userid});
        const myformlist = await FormData.find({creator:user}).lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});

        res.status(201).json(myformlist)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const GetFormDataCount = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {id} = req.params;
        const count = await FormData.countDocuments({form:id})
        res.status(201).json({"count":count})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}



// export const temp = async(req,res)=>{
//     try {
//         // const filterDate = new Date('2022-01-21');
//         res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
//         const formdatas = await FormData.updateMany({ "data.status": "#2ECC71" }, { $set: { "data.status": "#145A32" } })
//         // console.log('formdatas',formdatas)
//         // console.log('formlength',formdatas.length)
//         res.status(201).json({"pass":"pass"});
//     } catch (error) {
//         res.status(404).json({error:error.message})
//     }
// }
import FormData from "../models/FormData.js";
import FormModel from "../models/FormModel.js";
import User from "../models/User.js";

import Form from "../models/Form.js";

  

  
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
        const startTime = new Date().getTime();
        const {skip,limit} = req.params;

        const myformlist = await FormData.find().lean().sort([['createdAt', -1]]).skip(skip).limit(limit).populate({path:"history"}).populate(["form","creator"]).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        const endTime = new Date().getTime();
        // Calculate the elapsed time in milliseconds
        const elapsedTime = endTime - startTime;
        console.log('time between part',elapsedTime)
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
        const startTime = new Date().getTime();
        // Stop the timer


  
        if (parseInt(time)===0){
            var formlist = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        }else{
            var formlist = await FormData.find({updatedAt: { $gt: parseInt(time) }}).lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});

            // var formlist = await FormData.aggregate(pipeline);
        }
        if (formlist.length < 1){
            formlist = 0
        }
        
        const MapData = new Map();
        MapData.set('data',formlist)
        const myObj = Object.fromEntries(MapData);
        const endTime = new Date().getTime();
        // Calculate the elapsed time in milliseconds
        const elapsedTime = endTime - startTime;
        console.log('time between all',elapsedTime)
        res.status(201).json(myObj)
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



export const temp = async(req,res)=>{
    try {
        // const filterDate = new Date('2022-01-21');
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const Formmodel = await FormModel.findOne({name:"Buglist"})
        const FormDatas = await FormData.find().lean().sort([['createdAt', -1]]).populate(["form","creator"]).populate({path:"history"}).populate({path:"comments",populate:{path:"user",select:["Name","picturePath"]}});
        
        const name = Formmodel.name;
        const selectdata = Formmodel.selectdata;
        const schema = Formmodel.schema;
        const newForm = new Form({
            name,
            selectdata,
            schema,
        });
        await newForm.save();
        const tempdata_list = []
        for (const item in FormDatas){
            const {creator,data,comments,history} = FormDatas[item];
            tempdata_list.push({
                'creator':creator['_id'],
                'data':data,
                'comments':comments,
                'history':history
            })
            // await newForm.save();
        }
        newForm.datalist = tempdata_list;
        await newForm.save()
        const buffer = Buffer.from([newForm]);

        const sizeInBytes = Buffer.byteLength(buffer);
        const sizeInKB = sizeInBytes / 1024;

        console.log(sizeInKB); // Output: 0.0126953125
        
        console.log('formdatas',newForm)
        res.status(201).json({"pass":"pass"});
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
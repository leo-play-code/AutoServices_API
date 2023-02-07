import FormData from "../models/FormData.js";
import FormModel from "../models/FormModel.js";




// new form method
export const Create = async(req,res)=>{
    try {
        const {
            name,
            selectdata,
            schema
        } = req.body;
        const newform = new FormModel({
            name,
            selectdata,
            schema
        });
        const savedform = await newform.save();
        res.status(201).json(savedform);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const Delete = async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const Update = async(req,res)=>{
    try {
        const {formname} = req.params;
        const formmodel = await FormModel.findOne({name:formname}).lean();
        if(!formmodel) return res.status(400).json({msg:"formmodel doesn't have dictdata ."});
        formmodel.selectdata = req.body['selectdata']
        formmodel.schema = req.body['schema']
        formmodel.save();
        res.status(200).json(formmodel)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const GetAll = async(req,res)=>{
    try {
        const formmodellist = await FormModel.find().lean();
        for (const num in formmodellist){
            formmodellist[num]['count']=await FormData.countDocuments({form:formmodellist[num]['_id']})
        }
        res.status(200).json(formmodellist);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


export const GetOne = async(req,res)=>{
    try {
        const {formname} = req.params;
        const formmodel = await FormModel.findOne({name:formname}).lean();
        if(!formmodel) return res.status(400).json({msg:"formmodel doesn't have dictdata ."});
        res.status(200).json(formmodel);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
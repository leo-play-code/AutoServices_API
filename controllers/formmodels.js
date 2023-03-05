import FormData from "../models/FormData.js";
import FormModel from "../models/FormModel.js";
import Form from "../models/Form.js";



// new form method
export const Create = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
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
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const Update = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {formname} = req.params;
        const formmodel = await FormModel.findOne({name:formname});
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
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )

        // Stop the timer
        const formmodellist = await FormModel.find().lean()

        


        for (const num in formmodellist){
            const {_id} = formmodellist[num];
            const number = await FormData.aggregate().group({ _id:_id, countOfChildrenPerParent: { $sum: 1 } }).exec()

            if (number.length<1){
                formmodellist[num]['number'] = 0;
            }else{
                formmodellist[num]['number'] = number[0]['countOfChildrenPerParent'];
            }
        }


        
        
        res.status(200).json(formmodellist);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}


export const GetOne = async(req,res)=>{
    try {
        res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
        const {formname} = req.params;
        const formmodel = await FormModel.findOne({name:formname}).lean();
        if(!formmodel) return res.status(400).json({msg:"formmodel doesn't have dictdata ."});
        res.status(200).json(formmodel);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
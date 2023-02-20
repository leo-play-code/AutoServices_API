import mongoose  from "mongoose";

const FormSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true
        },
        selectdata:{
            type:{},
            default:{}
        },
        schema:{
            type:{},
            default:{}
        },
    },
    {timestamps:true}
)

const FormModel = mongoose.model("FormModel",FormSchema);

export default FormModel;
import mongoose from "mongoose";
const FormDataSchema = new mongoose.Schema(
    {
        form:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"FormModel"
        },
        creator:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        data:{
            type:{},
            default:{}
        },
        comments:[
            { 
                user: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"User"
                }, 
                comments: String,
                createTime:{
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    {timestamps:true}
)

const FormData = mongoose.model("FormData",FormDataSchema);
export default FormData;
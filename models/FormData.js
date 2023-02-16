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
                edit:{
                    type:Boolean,
                    default:false
                },
                createTime:{
                    type: Date,
                    default: Date.now
                }
            }
        ],
        history:[
            {
                user: String,
                data:{
                    type:{},
                    default:{}
                },
                updateTime:{
                    type:Date,
                    default:Date.now
                }
            }
        ]
    },
    {timestamps:true}
)

const FormData = mongoose.model("FormData",FormDataSchema);
export default FormData;
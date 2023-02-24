import mongoose from "mongoose";

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
        datalist:[
            {
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
            }
        ]
    },
    {timestamps:true}
)

const Form = mongoose.model("Form",FormSchema);
export default Form;


// datalist:{
//     type:Map,
//     of: mongoose.Schema.Types.Mixed
// }
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        Name:{
            type:String,
            required:true,
            min:2,
            max:50,
            unique:true
        },
        email:{
            type:String,
            required:true,
            min:2,
            max:50,
            unique:true
        },
        picturePath:{
            type:String
        },
        allow:{
            type:Boolean,
            default:false
        },
        setting:{
            type:{},
            default:{}
        },
        account:{
            type:String
        }

    },
    {timestamps:true}
);

const User = mongoose.model("User",UserSchema)

export default User;
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
            default:{
                "貼文顯示方式":{
                    "Buglist":{
                        "status":true,
                        "system":true,
                        "time":true,
                        "tester":true,
                        "testcasename":true,
                        "chinesedescription":true,
                        "title":true,
                        "systeminformation":true,
                        "description":true,
                        "informationlink":true,
                    }
                }
            }
        }

    },
    {timestamps:true}
);

const User = mongoose.model("User",UserSchema)

export default User;
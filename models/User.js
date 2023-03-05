import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
            default: {
                "貼文顯示方式" : {
                    "Buglist" : {
                        "priority" : true,
                        "pin" : true,
                        "status" : true,
                        "system" : false,
                        "time" : false,
                        "tester" : true,
                        "testcasename" : false,
                        "chinesedescription" : false,
                        "title" : true,
                        "systeminformation" : false,
                        "description" : false,
                        "informationlink" : false
                    }
                }
            },
        },
        account:{
            type:String
        },
        password:{
            type:String,
            required:true
        }

    },
    {timestamps:true}
);

// Hash and salt the password before saving the user to the database
UserSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});
  
// Compare the entered password with the hashed password in the database
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User",UserSchema)

export default User;
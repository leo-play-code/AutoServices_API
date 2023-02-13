import mongoose from "mongoose";


const GoogleSheetSchema = new mongoose.Schema(
    { 
        name:{
            type:String,
            required:true,
            unique:true
        },
        // sheetMap:{
        //     type:Map,
        //     of:String,
        //     default:{}
        // },
        docID:{
            type:String,
            require:true,
            unique:true
        }
    },
    {timestamps:true}
)

const GoogleSheet = mongoose.model("GoogleSheet",GoogleSheetSchema);
export default GoogleSheet;
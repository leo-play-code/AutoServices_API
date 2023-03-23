import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import formmodelRoutes from "./routes/formmodels.js";
import FormModel from "./models/FormModel.js";
import ForData from "./models/FormData.js";
import formdataRoutes from "./routes/formdatas.js";
import googlesheetRoutes from "./routes/googlesheet.js";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import nodemailer from 'nodemailer';
// import {GetFormData} from "./data/index.js";
// import { formmodel } from "./data/index.js";

// image upload ckeditor
import  multiparty  from 'connect-multiparty';



/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/assets");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    },
});

const upload = multer({storage});

// upload middleware


const MultipartyMiddleware = multiparty({uploadDir:'./images'});



app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());


// static 設定為某個 file
// console.log(__dirname+'/images')
app.use(express.static(__dirname));
// url 可以用static 內圖片的路徑來顯示圖片
app.post('/uploads/images',MultipartyMiddleware,(req,res)=>{
    res.set("Access-Control-Allow-Origin",`${process.env.CLIENT_URL}` )
    // res.set("Access-Control-Allow-Origin",'https://autoservices.onrender.com' )
    // console.log(req.files.upload.path);
    const imagePath = req.files.upload.path;
    // console.log('req.file.upload',req.files.upload)
    res.status(200).json({
        uploaded:true,
        url: `${process.env.SERVER_URL}/${imagePath}`
        // url:`${req.files.upload.originalFilename}`
    })
})


/* ROUTES WITH FILES */
// app.post("/posts",verifyToken,upload.single("picture"),createPost);



/* ROUTES */
app.use("/auth",authRoutes);
app.use("/users",userRoutes);
app.use("/formdata",formdataRoutes);
app.use("/googlesheet",googlesheetRoutes);

// new
app.use("/formmodel",formmodelRoutes)

// mail 
const mail = process.env.MAIL_ACCOUNT
const pass = process.env.MAIL_PASSWORD


export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: mail,
        pass: pass
    }
});


export const sendVerfiyMail = (mailOptions)=>{
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}



/* MOGOOSE SETUP */
const PORT = process.env.PORT || 6003;
mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,() => console.log(`Server Port: ${PORT}`));
    // updateUsers()


    /* ADD DATA ONE TIME */
    // FormModel.insertMany(formmodel);
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`))


// const connectDB = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URL,{
//             useNewUrlParser:true,
//             useUnifiedTopology:true,
//         })
//         const formdata =  await GetFormData()
//         console.log('formdata length',formdata.length)
//         // var templist = []
//         // for (const num in formdata){
//         //     templist.push(formdata[num])
//         //     if (templist.length >990){
//         //         ForData.insertMany(templist)
//         //         templist = []
//         //     }
//         // }
//         // if (templist.length>0){
//         //     ForData.insertMany(templist)
//         // }
        

//         console.log(`Server Port: ${PORT}`);
//     } catch (err) {
//         console.log(`${err} did not connect`)
//     }
// }

// connectDB()
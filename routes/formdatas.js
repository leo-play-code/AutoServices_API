import express from "express";
import {
    createform,
    deleteform,
    updateform,
    getform,
    getallform,
    updateformcomments,
    getmyformdata
} from "../controllers/formdatas.js"
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

router.patch("/create/:userid/:formmodelid",verifyToken,createform);
router.delete("/delete/:id",verifyToken,deleteform);
router.post("/updateformcomments/:id",verifyToken,updateformcomments);
router.get("/get/:id",verifyToken,getform);
router.get("/getall",verifyToken,getallform);
router.get("/getmyformdata/:userid",verifyToken,getmyformdata);
router.patch("/update/:userid/:formdataid",verifyToken,updateform);


export default router;
import express from "express";
import {
    Create,
    Delete,
    Update,
    GetOne,
    GetAll,
    GetFormModelAll,
    CreateComment,
    GetUserAll,
    UpdateComment,
    GetFormDataCount,
    GetFormModelPart,
    temp
    
} from "../controllers/formdatas.js"
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();
router.get("/GetAll/:time",verifyToken,GetAll);
router.get("/GetFormModelAll/:formid",verifyToken,GetFormModelAll);
router.get("/GetOne/:id",verifyToken,GetOne);
router.get("/GetUserAll/:userid",verifyToken,GetUserAll);
router.get("/GetFormModel/FormData/count/:id",verifyToken,GetFormDataCount);
router.get("/GetFormModelPart/:skip/:limit",verifyToken,GetFormModelPart);


router.post("/CreateComment/:id",verifyToken,CreateComment);
router.post("/UpdateComment/:id",verifyToken,UpdateComment);

router.patch("/Create/:userid/:formmodelid",verifyToken,Create);
router.patch("/Update/:userid/:formdataid",verifyToken,Update);

router.delete("/Delete/:id",verifyToken,Delete);


router.get("/temp",verifyToken,temp);







export default router;
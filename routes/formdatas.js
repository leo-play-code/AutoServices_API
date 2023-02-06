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
    GetFormModelPart
    
} from "../controllers/formdatas.js"
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();
router.get("/GetAll",verifyToken,GetAll);
router.get("/GetFormModelAll/:formid",verifyToken,GetFormModelAll);
router.get("/GetOne/:id",verifyToken,GetOne);
router.get("/GetUserAll/:userid",verifyToken,GetUserAll);
router.get("/GetFormModel/FormData/count/:id",verifyToken,GetFormDataCount);
router.get("/GetFormModelPart/:formid/:number",verifyToken,GetFormModelPart);


router.post("/CreateComment/:id",verifyToken,CreateComment);
router.post("/UpdateComment/:id",verifyToken,UpdateComment);

router.patch("/Create/:userid/:formmodelid",verifyToken,Create);
router.patch("/Update/:userid/:formdataid",verifyToken,Update);

router.delete("/Delete/:id",verifyToken,Delete);








export default router;
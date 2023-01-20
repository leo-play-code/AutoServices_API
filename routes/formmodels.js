import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    createformmodel,
    getformmodel,
    updateformmodel,
    deleteformmodel,
    getallformmodel,
}from "../controllers/formmodels.js";

const router = express.Router();

// test new form url
router.patch("/create",verifyToken,createformmodel);
router.get("/get/:formname",verifyToken,getformmodel);
router.post("/update/:formname",verifyToken,updateformmodel);
router.delete("/delete/:formname",verifyToken,deleteformmodel);
router.get("/getall",verifyToken,getallformmodel);

export default router;

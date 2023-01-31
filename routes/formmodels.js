import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
    Create,
    GetOne,
    Update,
    Delete,
    GetAll,
}from "../controllers/formmodels.js";

const router = express.Router();

// test new form url
router.get("/GetOne/:formname",verifyToken,GetOne);
router.get("/GetAll",verifyToken,GetAll);

router.post("/Create",verifyToken,Create);

router.delete("/Delete/:formname",verifyToken,Delete);

router.post("/Update/:formname",verifyToken,Update);



export default router;

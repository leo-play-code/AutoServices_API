import express from "express";
import { verifyToken } from '../middleware/auth.js';
import {
    GetData,

} from "../controllers/googlesheet.js";

const router = express.Router();


router.get("/GetData/:docID/:sheetID",verifyToken,GetData);


export default router;
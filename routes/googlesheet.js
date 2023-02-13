import express from "express";
import { verifyToken } from '../middleware/auth.js';
import {
    GetData, SaveData,DetectData, GetSheetMap, GetAllList

} from "../controllers/googlesheet.js";

const router = express.Router();


router.get("/GetData/:docID/:sheetID",verifyToken,GetData);
router.get("/GetSheetMap/:sheetID",verifyToken,GetSheetMap);
router.get("/DetectData/:docID/:sheetID",verifyToken,DetectData);
router.get("/GetAllList",verifyToken,GetAllList)
router.post("/SaveData/:docID/:sheetID",verifyToken,SaveData);

export default router;
import express from "express";
import {
    GetOne,
    UpdateSetting,
    GetAll
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/GetOne/:id",verifyToken,GetOne);
router.get("/GetAll",verifyToken,GetAll);
router.post("/UpdateSetting/:id",verifyToken,UpdateSetting);

export default router;

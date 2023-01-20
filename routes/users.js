import express from "express";
import {
    getUser,
    updatesetting,
    getAllUser
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";


const router = express.Router();

router.get("/:id",verifyToken,getUser);
router.post("/:id/updatesetting",verifyToken,updatesetting);
router.get("/get/alluser",verifyToken,getAllUser);

export default router;

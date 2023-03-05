import express from "express";
import { login,register,resetpassword,sendVerifyNumber } from "../controllers/auth.js";

const router = express.Router();


router.post("/login",login);
router.post("/register",register);
router.post("/sendVerifyNumber/:email",sendVerifyNumber)
router.post("/resetpassword",resetpassword)
export default router;
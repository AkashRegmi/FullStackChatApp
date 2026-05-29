import express from "express";
import { loginController, registerUser } from "../controller/authcontroller.js";

const router = express.Router();

router.post("/register", registerUser);
//thie ie the router
router.post("/login", loginController);
export default router;

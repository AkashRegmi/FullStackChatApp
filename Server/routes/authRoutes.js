import express from "express";
import { registerUser } from "../controller/authcontroller.js";

const router = express.Router();

router.post("/register", registerUser);
//thie ie the router 

export default router;

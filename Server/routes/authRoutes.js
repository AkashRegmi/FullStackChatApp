import express from "express";
import {
  getMessages,
  getusers,
  loginController,
  registerUser,
} from "../controller/authController.js";
import protect from "../middleWare/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
//thie ie the router
router.post("/login", loginController);
router.get("/user", protect, getusers);
router.get("/messages/:userId/:otherUserId", protect, getMessages);
export default router;

import express from "express";
import {
getAuthUsers,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/login",getAuthUsers);

export default router;

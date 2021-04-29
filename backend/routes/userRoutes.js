import express from "express";
import {
    getAuthUsers,
    getUserProfile, registerUsers,
    updateUserProfile
} from "../controllers/userController.js";
import {protect} from '../middleware/authMiddleware.js';
const router = express.Router();
router.route("/").post(registerUsers);
router.post("/login", getAuthUsers);

router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)

export default router;

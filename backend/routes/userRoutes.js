import express from "express";
import {
    getAuthUsers,
    getUserProfile
} from "../controllers/userController.js";
import {protect} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/login", getAuthUsers);
router.route("/profile").get(protect,getUserProfile)

export default router;

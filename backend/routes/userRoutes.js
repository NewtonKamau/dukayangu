import express from "express";
import {
    getAuthUsers,
    getUserProfile,
    registerUsers,
    updateUserProfile, getUsers,
    deleteUser
} from "../controllers/userController.js";
import {protect,admin} from '../middleware/authMiddleware.js';
const router = express.Router();
router.route("/").post(registerUsers).get(protect,admin, getUsers);
router.post("/login", getAuthUsers);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile)
router.route("/:id").delete(protect,deleteUser);
export default router;

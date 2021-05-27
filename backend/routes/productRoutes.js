import express from 'express';
import { deleteProduct, getProductById, getProducts } from '../controllers/productController.js';
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";


router.route("/").get(getProducts);

router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);;

export default router;

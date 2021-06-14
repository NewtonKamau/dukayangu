import express from 'express';
import { deleteProduct, getProductById, getProducts,updateProduct,createProduct } from '../controllers/productController.js';
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";


router.route("/").get(getProducts).post(protect,createProduct);

router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect,updateProduct);

export default router;

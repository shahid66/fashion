import express from "express";
import {
  deleteProduct,
  getProductById,
  getProducts,
  productSize,
  registerProduct,
  updateProduct,
} from "../controller/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, registerProduct);
router.route("/:id").get(getProductById);
router.route("/:id/size").post(protect, productSize);
// router.route('/:id/reviews').get(getProductById)

//admin part
router.route("/:id").put(updateProduct).delete(deleteProduct);

export default router;

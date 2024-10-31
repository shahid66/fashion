import express from "express";
import {
  getOrderById,
  getOrders,
  registerOrder,
} from "../controller/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, registerOrder).get(protect, getOrders);
router.route("/:id").get(protect, getOrderById);

export default router;

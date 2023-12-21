import { authUser,registerUser, logoutUser, GetOrders, updateOrder } from "../controllers/userController.js";
import OrderControllers from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/orders").get(protect, OrderControllers.getAllOrders).put(protect, OrderControllers.updateOrder);
router.put("/update-order", protect, OrderControllers.updateOrder);




export default router;
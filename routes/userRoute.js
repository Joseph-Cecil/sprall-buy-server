import { authUser,registerUser, logoutUser, GetOrders, updateOrder } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/orders").get(protect, GetOrders).put(protect, updateOrder)




export default router;
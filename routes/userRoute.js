import { authUser,registerUser, logoutUser, GetOrders, updateOrder } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.get("/orders", GetOrders);
router.put("/update-order", updateOrder);




export default router;
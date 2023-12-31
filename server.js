import express from "express";
import corsOptions from "./config/corsOptions.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { protect } from "./middleware/authMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();


connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cors(corsOptions));

const port = process.env.PORT || 7000;

app.use("/api/users", userRoutes);
app.use("/api", orderRoutes)

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoute.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
dotenv.config();


connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const port = process.env.port || 6000;

app.use("/api/users", userRoutes)

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


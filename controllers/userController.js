import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// POST /api/users/auth -> Authenticate a delivery personnel
const authUser = expressAsyncHandler (async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email})
    if(user && (await user.matchPassword(password ))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        throw new Error("Invalid email or password")
    }
});

// POST /api/users -> Register a delivery personnel
const registerUser = expressAsyncHandler (async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already Exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        throw new Error("Invalid user data")
    }
})

// POST /api/users/logout -> Logout a delivery personnel
const logoutUser = expressAsyncHandler (async (req, res) => {
    res.status(200).json("This route logs out a user");
});

// GET /api/users/orders -> Get all orders; Private route
const GetOrders = expressAsyncHandler (async (req, res) => {
    res.status(200).json("This route fetches all orders");
});

// PUT /api/users/update-order -> Authenticate a delivery personnel
const updateOrder = expressAsyncHandler (async (req, res) => {
    res.status(200).json("This route updates an order");
});


export {
    authUser, registerUser, logoutUser, GetOrders, updateOrder
}
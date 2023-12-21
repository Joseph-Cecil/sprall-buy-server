import Order from "../models/orderModel.js"
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";


// Getting all Orders
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().lean()

    if(!orders){
        return res.status(400).json({message: "There are no Orders"})
    }

    res.json(orders)
});


// Creating a new Order
const createNewOrder = asyncHandler(async (req, res) => {
    const {order, price, location, name, areaName, houseNum, phoneNum } = req.body;

    if(!order || !price || !name || !areaName || !phoneNum){
        return res.status(400).json({message: "Order, price, name, areaName and phone Number are required to place order"});
    }

    
    const orderObject = {order, price, location, name, areaName, houseNum, phoneNum};
        
    const ordertoSave = await Order.create(orderObject)
console.log(ordertoSave);
    if(ordertoSave){
        return res.status(200).json({message: `Order ${orderObject.order} has been saved successfully`})
    }else{
        return res.status(400).json({message: "Order not saved"})
    }

    

});

//Updating order
const updateOrder = asyncHandler(async (req, res) => {
    const {id, completed} = req.body

    //confirming data
    if(!id || !completed){
        return res.status(400).json({message: "All fields are required"})
    }

    const order = await Order.findById(id).exec();

    if(!order){
        return res.status(400).json({message: "Order not found"})
    }

    order.completed = completed

    const updatedOrder = await order.save();

    res.json({message: `${updatedOrder.order} updated successfully`})
});

// Deleting an Order

const deleteOrder = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message: "Id is required to delete an order"})
    }

    const notCompleted = await Order.findOne({order: id}).lean().exec();

    if(notCompleted){
        return res.status(400).json({message: "Order is not completed"})
    }

    const order = await Order.findById(id).exec();

    if(!order){
        return res.status(400).json({message: "Order not found"})
    }

    const result = order.deleteOne();

    const reply = `Order with order ${order.name} has been deleted successfully`;

    res.json(reply);
});

const OrderControllers = {getAllOrders, createNewOrder, updateOrder, deleteOrder}

export default OrderControllers;
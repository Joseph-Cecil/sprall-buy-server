import { mongoose } from "mongoose";

const orderSchema = new mongoose.Schema({

     order: {
        type: String,
        required: true
     },
     price: {
        type: Number,
        required: true
     },
     location: {
        type: String,
     },
     name: {
        type: String,
        required: true
     },
     areaName: {
        type: String,
     },
     houseNum: {
        type: String,
     },
     phoneNum: {
        type: Number,
        required: true
     },
     completed: {
        type: Boolean,
        default: false
     }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
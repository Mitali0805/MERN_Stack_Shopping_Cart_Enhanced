const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const { User } = require('./user')

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number,
    user: { type: ObjectId, ref: 'User' }
  },
  { timestamps: true },
);
 
const CartItem = mongoose.model("CartItem", CartItemSchema);
 
const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    feedback: {
      type: String,
      default: "default",
      // enum: ["Not Satisfied", "Satisfied", "Good Quality", "Highly recommend"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
 
const Order = mongoose.model("Order", OrderSchema);
 
module.exports = { Order, CartItem };


const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                itemType: { type: String, required: true, enum: ["Booking"] },
                refId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'items.itemType' },
                price: Number,
                quantity: Number
            }
        ],
        totalPrice: Number,
        paymentStatus: { type: String, enum: ["Pending", "Completed", "Cancelled", "Failed", "Refunded"] },
        paymentMode: { type: String, enum: ["Wallet", "Online"] }
    }, { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
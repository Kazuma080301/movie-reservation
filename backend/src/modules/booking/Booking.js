const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
    {
        bookingCode: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
        theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
        screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
        seats: [
            {
                seat: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true },
                price: { type: Number, required: true }
            }
        ],
        totalPrice: Number,
        status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
        order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }
    }, { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
const mongoose = require("mongoose")

const seatSchema = new mongoose.Schema(
    {
        seatNumber: { type: String, required: true },
        seatType: { type: String, enum: ["Regular", "Premium", "VIP"], required: true },
        screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen" }
    }, { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);
module.exports = Seat;
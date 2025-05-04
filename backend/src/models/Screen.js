const mongoose = require("mongoose")

const screenSchema = new mongoose.Schema(
    {
        screenType: { type: String, enum: ["Standard", "IMAX", "Dolby"], default: "Standard" },
        theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" },
        seats: [
            {
                seatNumber: { type: String, required: true },
                seatType: { type: String, enum: ["Regular", "Premium", "VIP"], required: true },
                price: { type: Number, required: true },
                bookingRef: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" }
            }
        ]
    }, { timestamps: true }
);

const Screen = mongoose.model("Screen", screenSchema);
module.exports = Screen;
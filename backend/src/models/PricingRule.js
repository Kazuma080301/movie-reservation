const mongoose = require("mongoose")

const pricingRuleSchema = new mongoose.Schema(
    {
        theater: { type: mongoose.model.Types.ObjectId, ref: "Theater", required: true },
        screenType: { type: String, required: true },
        seatType: { type: String, required: true },
        price: { type: Number, required: true },
        dayType: { type: String, enum: ["Weekday", "Weekend", "Holiday"], default: "Weekday" },
    }, { timestamps: true }
);

const PricingRule = mongoose.model("PricingRule", pricingRuleSchema);
module.exports = PricingRule;
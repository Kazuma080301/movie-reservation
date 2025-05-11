const mongoose = require("mongoose")

const screenSchema = new mongoose.Schema(
    {
        name: String,
        screenType: { type: String, enum: ["Standard", "IMAX", "Dolby"], default: "Standard" },
        theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater" }
    }, { timestamps: true }
);

const Screen = mongoose.model("Screen", screenSchema);
module.exports = Screen;
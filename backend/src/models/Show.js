const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
        theater: { type: mongoose.Schema.Types.ObjectId, ref: "Theater", required: true },
        screen: { type: mongoose.Schema.Types.ObjectId, ref: "Screen", required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        format: { type: String, enum: ["2D", "3D", "IMAX"], default: "2D" },
        language: { type: String, default: "English" },
        status: { type: String, enum: ["Scheduled", "Cancelled", "Paused", "Completed"], default: "Scheduled" }
    }, { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
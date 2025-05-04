const mongoose = require("mongoose")

const theaterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        location: { type: String, required: true }
    }, { timestamps: true }
);

const Theater = mongoose.model("Theatre", theaterSchema);
module.exports = Theater;
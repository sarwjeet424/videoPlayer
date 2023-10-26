const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    videoLink: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slot", slotSchema);

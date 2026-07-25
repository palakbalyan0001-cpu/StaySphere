const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: { type: String, required: true, unique: true, trim: true },
    type: {
      type: String,
      enum: ["Single", "Double", "Deluxe", "Suite", "Family"],
      required: true,
    },
    pricePerNight: { type: Number, required: true, min: 0 },
    acNonAc: { type: String, enum: ["AC", "Non-AC"], default: "AC" },
    bedType: { type: String, enum: ["Single", "Double", "Queen", "King", "Twin"], default: "Double" },
    wifi:{type:Boolean,enum:["true","false"]},
    capacity: { type: Number, required: true, min: 1 },
    description: { type: String, default: "" },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["Available", "Booked", "maintenance"],
      default: "Available",
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("rooms", roomSchema);

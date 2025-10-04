const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image_path: { type: String }, // e.g., "/uploads/abc123.jpg"
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);

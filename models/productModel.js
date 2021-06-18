const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    offer: {
      type: Number,
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: String,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      maxlength: 1000,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

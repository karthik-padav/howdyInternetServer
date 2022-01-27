const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    productId: { type: String, required: true },
    productColors: { type: JSON },
    price: { type: JSON },
    rating: { type: String },
    reviews: { type: String },
    thumbnail: { type: JSON },
  },
  { timestamps: true }
);

export default mongoose.models.product ||
  mongoose.model("product", ProductSchema);

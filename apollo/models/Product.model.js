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
    images: { type: JSON },
    features: { type: JSON },
    technicalDetails: { type: JSON },
    productInformation: { type: JSON },
  },
  { timestamps: true }
);

export default mongoose.models.product ||
  mongoose.model("product", ProductSchema);

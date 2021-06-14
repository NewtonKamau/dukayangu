import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  // add relationship between comment/review and user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
}, {
    timestamps:true
});

const productSchema = mongoose.Schema(
  {
    // add relationship between product and user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
        },
    review:[reviewSchema],
    numReviews: {
      type: String,
      required: true,
      default: 0,
    },
    price: {
      type: String,
      required: true,
      default: 0,
    },
    countInStock: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
export default Product;

import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("product", ProductSchema);

export default Product;

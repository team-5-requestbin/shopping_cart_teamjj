import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const { ObjectId } = Schema.Types;

const CartItemSchema = new Schema(
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
    },
    productId: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const CartItem = model("cartItem", CartItemSchema);

export default CartItem;

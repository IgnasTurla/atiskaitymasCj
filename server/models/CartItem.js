import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true },
  name: String,
  image: String,
  price: Number, // su antkainiu ir siuntimu
  color: String,
  size: String,
  quantity: { type: Number, default: 1 }
});

export default mongoose.model("CartItem", cartItemSchema);

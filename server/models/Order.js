import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: String,
      name: String,
      image: String,
      price: Number,
      color: String,
      size: String,
      quantity: Number
    }
  ],
  total: { type: Number, required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: String,
    zipCode: String,
    country: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);

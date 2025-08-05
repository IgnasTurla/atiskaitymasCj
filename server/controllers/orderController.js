import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.userId;

    const { items, total, shippingAddress } = req.body;

    if (!userId || !items || !total || !shippingAddress) {
      return res.status(400).json({ message: "Trūksta duomenų" });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      shippingAddress,
    });

    await newOrder.save();

    res.status(201).json({ message: "Užsakymas sėkmingai pateiktas!" });
  } catch (err) {
    console.error("Klaida kuriant uzsakyma:", err);
    res.status(500).json({ message: "Serverio klaida" });
  }
};


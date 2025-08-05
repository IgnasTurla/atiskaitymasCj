// src/pages/CheckoutPage.tsx
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import "../styles/CheckoutPage.scss";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Turite būti prisijungę, kad galėtumėte pateikti užsakymą.");
      navigate("/login");
    }
  }, [token, navigate]);

  // Skaicuoti bendra kaina
  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !city || !zipCode) {
      alert("Prašome užpildyti visus adresų laukus.");
      return;
    }

    const orderData = {
      items: cart,
      total: total.toFixed(2),
      shippingAddress: {
        fullName: `${user?.name} ${user?.surname}`,
        address,
        city,
        zipCode,
        country: "Lietuva",
      },
    };

    try {
      await axios.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      alert("✅ Užsakymas pateiktas!");
      navigate("/");
    } catch (err) {
      alert("Klaida pateikiant užsakymą");
      console.error(err);
    }
  };

  return (
    <div className="checkout-page">
      <h2>Pateikti užsakymą</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Vardas:</label>
          <input value={user?.name || ""} disabled />
        </div>

        <div className="form-group">
          <label>Pavardė:</label>
          <input value={user?.surname || ""} disabled />
        </div>

        <div className="form-group">
          <label>El. paštas:</label>
          <input type="email" value={user?.email || ""} disabled />
        </div>

        <div className="form-group">
          <label>Adresas:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Miestas:</label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Pašto kodas:</label>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>

        <div className="order-summary">
          <h3>Užsakymo suvestinė:</h3>
          {cart.map((item) => (
            <div key={item.skuId}>
              {item.name} ({item.color}, {item.size}) – {item.quantity} vnt. × €{item.price}
            </div>
          ))}
          <p><strong>Iš viso: €{total.toFixed(2)}</strong></p>
        </div>

        <button type="submit" className="submit-btn">Pateikti užsakymą</button>
      </form>
    </div>
  );
}

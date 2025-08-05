// src/pages/CartPage.tsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../styles/CartPage.scss";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => {
    return sum + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <h2>Pirkinių Krepšelis</h2>

      {cart.length === 0 ? (
        <p>Krepšelis tuščias</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.skuId} className="cart-item">
              <img src={item.image} alt={item.name} />

              <div className="cart-info">
                <h4>{item.name}</h4>
                <p>Spalva: {item.color}</p>
                <p>Dydis: {item.size}</p>
                <p>Kaina: €{item.price}</p>

                <label>
                  Kiekis:
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.skuId, parseInt(e.target.value))
                    }
                  />
                </label>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.skuId)}
                >
                  🗑️ Pašalinti
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Iš viso: €{total.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="checkout-btn">Tęsti užsakymą</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Vienos prekes tipas
interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  color: string;
  size: string;
  skuId: string;
}

// funkciju ir duomenų tipas
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (skuId: string) => void;
  updateQuantity: (skuId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// provideris apgaubia visa aplikacija
export function CartProvider({ children }: { children: ReactNode }) {
  // krepselio duomenys is localstorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // prideti krepselio duomenis i localstorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // prideda preke i krepseli
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      // ziuri ar tokia preke yra
      const existing = prev.find(
        (i) =>
          i.skuId === item.skuId &&
          i.color === item.color &&
          i.size === item.size
      );

      if (existing) {
        // jeigu yra padidina kieki
        return prev.map((i) =>
          i.skuId === item.skuId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        // jeigu nera ideda nauja preke
        return [...prev, item];
      }
    });
  };

  // pasalina preke 
  const removeFromCart = (skuId: string) => {
    setCart((prev) => prev.filter((item) => item.skuId !== skuId));
  };

  // atnaujina kieki
  const updateQuantity = (skuId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.skuId === skuId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

// hookas kuris leidzia naudoti krepseli kituose komponentuose
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart turi būti naudojamas CartProvider viduje");
  }
  return context;
}

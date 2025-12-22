"use client";

import { useEffect, useState } from "react";
import { getCartItems, clearCart } from "@/lib/cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCartItems());
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-xl font-bold">Checkout</h1>
        <p className="text-gray-500 mt-4">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between border-b py-3"
        >
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">
              ₹{item.price} × {item.qty}
            </p>
          </div>
          <p className="font-semibold">
            ₹{item.price * item.qty}
          </p>
        </div>
      ))}

      <div className="text-right font-bold text-lg mt-4">
        Total: ₹{total}
      </div>

      <button
        onClick={() => {
          alert("Order placed (demo)");
          clearCart();
          setCart([]);
        }}
        className="w-full bg-orange-600 text-white py-3 rounded mt-6"
      >
        Place Order
      </button>
    </div>
  );
}
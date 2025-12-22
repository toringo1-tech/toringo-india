"use client";

import { useEffect, useState } from "react";
import { getCartItems, removeFromCart, clearCart } from "@/lib/cart";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const total = items.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 && (
        <p className="text-gray-500">Cart is empty</p>
      )}

      {items.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-600">
              ₹{item.price} × {item.qty}
            </p>
          </div>

          <button
            onClick={() => {
              removeFromCart(item._id);
              setItems(getCartItems());
            }}
            className="text-red-600 text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <>
          <div className="text-right font-bold mt-4">
            Total: ₹{total}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                clearCart();
                setItems([]);
              }}
              className="px-4 py-2 border rounded"
            >
              Clear Cart
            </button>

            <button
              onClick={() => alert("Checkout coming soon")}
              className="px-4 py-2 bg-orange-600 text-white rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
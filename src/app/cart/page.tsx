"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export default function CartPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [cart, setCart] = useState<CartItem[]>([]);

  // 🔐 Login protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      localStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
      return;
    }

    const storedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(storedCart);
  }, [router, pathname]);

  // ➕ Increase qty
  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ➖ Decrease qty
  const decreaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // ❌ Remove item
  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // 🟡 Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <p className="text-gray-500 mb-4">
          Your cart is empty
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold mb-4">
          My Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.price}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="border px-2"
                  >
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="border px-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ₹{item.price * item.qty}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        {/* Checkout */}
        <button
          onClick={() => router.push("/checkout")}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded text-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
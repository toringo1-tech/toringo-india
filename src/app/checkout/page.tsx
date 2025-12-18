"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 PROTECT CHECKOUT
  useEffect(() => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      router.replace("/login");
      return;
    }

    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false);
  }, [user, router]);

  if (!user || loading) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

  const placeOrder = () => {
    // 🔹 Save order (demo)
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    orders.push({
      id: Date.now(),
      user: user.email,
      items: cart,
      total,
      date: new Date().toISOString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    router.push("/orders/success");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">
        Checkout
      </h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* LEFT: ADDRESS + PAYMENT */}
          <div className="md:col-span-2 space-y-6">
            {/* ADDRESS */}
            <div className="border rounded p-4">
              <h2 className="font-semibold mb-3">
                Delivery Address
              </h2>

              <input
                placeholder="Full Name"
                className="w-full border p-2 rounded mb-2"
              />
              <input
                placeholder="Mobile Number"
                className="w-full border p-2 rounded mb-2"
              />
              <textarea
                placeholder="Full Address"
                className="w-full border p-2 rounded"
              />
            </div>

            {/* PAYMENT */}
            <div className="border rounded p-4">
              <h2 className="font-semibold mb-3">
                Payment Method
              </h2>

              <label className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 text-gray-400">
                <input type="radio" disabled />
                Online Payment (Coming Soon)
              </label>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="border rounded p-4 h-fit">
            <h2 className="font-semibold mb-4">
              Order Summary
            </h2>

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm mb-2"
              >
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full bg-green-600 text-white py-3 rounded mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
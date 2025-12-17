"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [cart, setCart] = useState<any[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // 🔐 login protection + cart load
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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    orders.push({
      id: Date.now(),
      items: cart,
      total,
      status:
        paymentMethod === "COD"
          ? "Confirmed"
          : "Payment Pending",
      paymentMethod,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    router.push("/orders/success");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-md mx-auto bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold mb-4 text-center">
          Checkout
        </h1>

        {/* ORDER SUMMARY */}
        <div className="border rounded p-3 mb-4 text-sm">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex justify-between mb-1"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>
                ₹{item.price * item.qty}
              </span>
            </div>
          ))}

          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">
            Payment Method
          </h2>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery (COD)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "ONLINE"}
              onChange={() => setPaymentMethod("ONLINE")}
            />
            Online Payment (UPI / Card)
          </label>

          {paymentMethod === "ONLINE" && (
            <p className="text-xs text-gray-500 mt-2">
              * Online payment is dummy for now
            </p>
          )}
        </div>

        {/* PLACE ORDER */}
        <button
          onClick={placeOrder}
          className="w-full bg-green-600 text-white py-3 rounded text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
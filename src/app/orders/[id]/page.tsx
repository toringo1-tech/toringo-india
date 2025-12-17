"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";

export default function OrderDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const orderId = params.id;

  const [order, setOrder] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 🔐 login check
    const u =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    if (!u) {
      localStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
      return;
    }

    setUser(u);

    // 📦 get order by id
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    const found = orders.find(
      (o: any) => String(o.id) === String(orderId)
    );

    setOrder(found || null);
  }, [router, pathname, orderId]);

  if (!user) return null;

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-gray-500 mb-4">
          Order not found
        </p>
        <button
          onClick={() => router.push("/orders")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold mb-4">
          Order Details
        </h1>

        {/* Order Info */}
        <div className="border-b pb-3 mb-4 text-sm">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="text-green-600">
              {order.status}
            </span>
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {order.items.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Qty: {item.qty}
                </p>
              </div>

              <div className="font-semibold">
                ₹{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

        {/* Back */}
        <button
          onClick={() => router.push("/orders")}
          className="mt-6 w-full border py-2 rounded"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}
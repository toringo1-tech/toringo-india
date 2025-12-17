"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [orders, setOrders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
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

    // Demo orders (localStorage based)
    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );
    setOrders(savedOrders);
  }, [router, pathname]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
        <h1 className="text-2xl font-bold mb-4">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>No orders found.</p>
            <button
              onClick={() => router.push("`/orders/${order.id}`")}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="border rounded p-3 flex flex-col gap-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium">
                    Order #{index + 1}
                  </span>
                  <span className="text-green-600">
                    {order.status || "Confirmed"}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  Total: ₹{order.total}
                </div>

                <div className="text-xs text-gray-400">
                  {order.date || "Just now"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
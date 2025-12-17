"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // 🔐 admin check
    const isAdmin =
      typeof window !== "undefined"
        ? localStorage.getItem("admin") === "true"
        : false;

    if (!isAdmin) {
      router.replace("/");
      return;
    }

    const allOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(allOrders);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto bg-white rounded shadow p-4">
        <h1 className="text-2xl font-bold mb-4">
          Admin – All Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">
            No orders available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Order ID</th>
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Payment</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, i) => (
                  <tr key={i} className="text-center">
                    <td className="border p-2">
                      {order.id}
                    </td>
                    <td className="border p-2">
                      {order.date}
                    </td>
                    <td className="border p-2">
                      ₹{order.total}
                    </td>
                    <td className="border p-2">
                      {order.paymentMethod}
                    </td>
                    <td className="border p-2">
                      {order.status}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() =>
                          router.push(`/orders/${order.id}`)
                        }
                        className="text-blue-600 underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
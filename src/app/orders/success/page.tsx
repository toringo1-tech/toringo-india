import Link from "next/link";

export default function OrdersSuccessPage() {
  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold text-green-600 mb-2">
        Order Confirmed ✅
      </h1>

      <p className="text-gray-600 mb-6">
        Your order has been placed successfully.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/orders"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          View Orders
        </Link>

        <Link
          href="/"
          className="px-4 py-2 border rounded"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
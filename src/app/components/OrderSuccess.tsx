import Link from "next/link";

export default function OrderSuccessUI() {
  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold text-green-600">
        Order Confirmed ✅
      </h1>

      <p className="mt-2">
        Your order has been placed successfully.
      </p>

      <div className="mt-6 flex justify-center gap-4">
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
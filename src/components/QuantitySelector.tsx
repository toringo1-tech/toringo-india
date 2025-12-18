"use client";

export default function QuantitySelector({
  qty,
  setQty,
}: {
  qty: number;
  setQty: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        onClick={() => setQty(Math.max(1, qty - 1))}
        className="px-3 py-1 border"
      >
        −
      </button>

      <span>{qty}</span>

      <button
        onClick={() => setQty(qty + 1)}
        className="px-3 py-1 border"
      >
        +
      </button>
    </div>
  );
}
"use client";

import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded shadow p-3">
      <div
        className="h-32 bg-gray-200 mb-2 cursor-pointer"
        onClick={() => router.push(`/product/${product.slug}`)}
      />

      <h3 className="text-sm font-semibold">{product.name}</h3>
      <p className="text-orange-600 font-bold">₹ {product.price}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-orange-600 text-white py-1 rounded"
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            addToCart(product);
            router.push("/checkout");
          }}
          className="flex-1 border border-orange-600 text-orange-600 py-1 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
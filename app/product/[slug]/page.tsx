"use client";

import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";

async function getProduct(slug: string) {
  const res = await fetch(
    http://localhost:3000/api/products?slug=${slug},
    { cache: "no-store" }
  );
  const data = await res.json();
  return data.products[0];
}

export default async function ProductPage({ params }: any) {
  const product = await getProduct(params.slug);
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <div className="h-80 bg-gray-200" />

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-orange-600 text-xl font-bold mt-2">
          ₹ {product.price}
        </p>

        <p className="text-gray-700 my-4">{product.description}</p>

        <button
          onClick={() => addToCart(product)}
          className="w-full bg-orange-600 text-white py-3 rounded mb-3"
        >
          Add to Cart
        </button>

        <button
          onClick={() => {
            addToCart(product);
            router.push("/checkout");
          }}
          className="w-full border border-orange-600 text-orange-600 py-3 rounded"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
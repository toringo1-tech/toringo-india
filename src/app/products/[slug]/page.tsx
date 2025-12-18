"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProductGallery from "@/components/ProductGallery";
import QuantitySelector from "@/components/QuantitySelector";
import AddToCartButton from "@/components/AddToCartButton";
import { useCart } from "@/context/CartContext";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const { addToCart, clearCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 🔹 Product fetch by slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to load products");

        const products = await res.json();
        const found = products.find(
          (p: any) => p.slug === params.slug
        );

        if (!found) {
          setError("Product not found");
        } else {
          setProduct(found);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  // 🔹 Buy Now logic
  const buyNow = () => {
    clearCart();                 // purana cart clear
    addToCart(product, qty);     // current product add
    router.push("/checkout");    // direct checkout
  };

  // 🔹 Loading
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  // 🔹 Error / Not found
  if (error || !product) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">
          {error || "Product not found"}
        </p>
        <button
          onClick={() => router.back()}
          className="text-blue-600 underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const discount =
    product.mrp && product.mrp > product.price
      ? product.mrp - product.price
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      {/* 🔹 LEFT : Images */}
      <ProductGallery
        images={product.images || [product.image]}
      />

      {/* 🔹 RIGHT : Details */}
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <div className="mt-2 flex items-center gap-3">
          <span className="text-2xl font-semibold text-green-600">
            ₹{product.price}
          </span>

          {product.mrp && (
            <span className="line-through text-gray-400">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {discount > 0 && (
          <p className="text-sm text-green-700 mt-1">
            You save ₹{discount}
          </p>
        )}

        <p className="mt-4 text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* 🔹 Quantity */}
        <div className="mt-6">
          <QuantitySelector qty={qty} setQty={setQty} />
        </div>

        {/* 🔹 Action Buttons */}
        <div className="mt-6 flex gap-3">
          {/* Add to Cart */}
          <AddToCartButton product={product} qty={qty} />

          {/* Buy Now */}
          <button
            onClick={buyNow}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold"
          >
            Buy Now
          </button>
        </div>

        {/* 🔹 Extra info */}
        <div className="mt-6 text-sm text-gray-500 space-y-1">
          <p>Category: {product.category}</p>
          {product.stock !== undefined && (
            <p>
              Stock:{" "}
              {product.stock > 0 ? "Available" : "Out of stock"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();

  // 🔹 Demo product (later API se aayega)
  const product = {
    id: "p1",
    name: "Cement UltraTech 50kg",
    price: 399,
    images: [
      "/product-1.png",
      "/product-2.png",
      "/product-3.png",
    ],
  };

  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  // 🛒 Add to cart
  const addToCart = () => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existing = cart.find(
      (item: any) => item.id === product.id
    );

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-4">

        {/* ===== IMAGE SECTION ===== */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 object-contain border cursor-pointer ${
                  activeImage === i
                    ? "border-blue-600"
                    : ""
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              onClick={() => setZoomOpen(true)}
              className="max-h-80 object-contain cursor-zoom-in"
            />
          </div>
        </div>

        {/* ===== PRODUCT INFO ===== */}
        <div className="mt-6">
          <h1 className="text-xl font-bold mb-2">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-green-600 mb-4">
            ₹{product.price}
          </p>

          <div className="flex gap-4">
            <button
              onClick={addToCart}
              className="flex-1 border border-green-600 text-green-600 py-2 rounded"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart();
                router.push("/checkout");
              }}
              className="flex-1 bg-green-600 text-white py-2 rounded"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* ===== IMAGE ZOOM MODAL ===== */}
      {zoomOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setZoomOpen(false)}
        >
          <img
            src={product.images[activeImage]}
            className="max-h-[90%] max-w-[90%] object-contain"
          />
        </div>
      )}
    </div>
  );
}
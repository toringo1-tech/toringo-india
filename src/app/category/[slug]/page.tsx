"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

/* ===== SAMPLE PRODUCTS (baad me API se replace) ===== */
const PRODUCTS = [
  { id: 1, name: "Cement", price: 799, slug: "cement", category: "building-material" },
  { id: 2, name: "Sand", price: 1200, slug: "sand", category: "building-material" },
  { id: 3, name: "Bricks", price: 650, slug: "bricks", category: "building-material" },
  { id: 4, name: "Floor Cleaner", price: 299, slug: "floor-cleaner", category: "home-cleaning" },
  { id: 5, name: "Wall Paint", price: 1999, slug: "wall-paint", category: "painting" },
];

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  /* ===== STATES ===== */
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "low" | "high">("default");
  const [maxPrice, setMaxPrice] = useState(5000);

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  /* ===== CATEGORY PRODUCTS ===== */
  const categoryProducts = PRODUCTS.filter(
    (p) => p.category === slug
  );

  /* ===== SEARCH + FILTER + SORT ===== */
  let filteredProducts = categoryProducts
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => p.price <= maxPrice)
    .slice();

  if (sortBy === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  /* ===== ADD TO CART ===== */
  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item.id === product.id);

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

    setToastMsg(`${product.name} added to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-7xl mx-auto">

        {/* ===== CATEGORY TITLE ===== */}
        <h1 className="text-2xl font-semibold mb-4 capitalize">
          {slug.replace("-", " ")}
        </h1>

        {/* ===== FILTER BAR ===== */}
        <div className="bg-white rounded shadow p-3 mb-4 flex flex-col md:flex-row gap-3 md:items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-full md:w-64"
          />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border rounded px-2 py-2 text-sm"
          >
            <option value="default">Default</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Max: ₹{maxPrice}
            </span>
            <input
              type="range"
              min={0}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        {/* ===== PRODUCTS ===== */}
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500">
            No product found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded shadow p-3 hover:shadow-md"
              >
                {/* Image + Name */}
                <Link href={`/products/${product.slug}`}>
                  <div className="h-28 bg-gray-100 mb-2 flex items-center justify-center text-xs text-gray-400">
                    Image
                  </div>

                  <h2 className="font-medium text-sm mb-1">
                    {product.name}
                  </h2>
                </Link>

                {/* Price */}
                <p className="text-blue-600 font-semibold text-sm mb-2">
                  ₹{product.price}
                </p>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white text-xs py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ===== TOAST ===== */}
        {showToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded shadow z-50">
            {toastMsg}
          </div>
        )}

      </div>
    </div>
  );
}
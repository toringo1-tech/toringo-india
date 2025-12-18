"use client";

export default function AddToCartButton({ product, qty }: any) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    cart.push({ ...product, qty });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
  };

  return (
    <button
      onClick={addToCart}
      className="w-full border border-green-600 text-green-600 py-3 rounded"
    >
      Add to Cart
    </button>
  );
}
"use client";

import { useEffect, useState } from "react";

export default function BuyNowCheckoutPage() {
  const [product, setProduct] = useState<any>(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem("buyNowProduct") || "null");
    setProduct(p);
  }, []);

  if (!product) {
    return <p className="p-4">No product selected</p>;
  }

  const placeOrder = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: "ORD" + Date.now(),
      date: new Date().toLocaleDateString(),
      status: "Confirmed",
      address,
      items: [product],
      total: product.price * product.qty,
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("buyNowProduct");

    window.location.href = "/checkout/success";
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buy Now Checkout</h1>

      {/* Address */}
      <textarea
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter delivery address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      {/* Product */}
      <div className="border rounded p-4 mb-4">
        <p className="font-semibold">{product.name}</p>
        <p>Qty: {product.qty}</p>
        <p className="font-bold">₹{product.price}</p>
      </div>

      <button
        onClick={placeOrder}
        className="w-full bg-green-600 text-white p-3 rounded text-lg"
      >
        Place Order
      </button>
    </div>
  );
}
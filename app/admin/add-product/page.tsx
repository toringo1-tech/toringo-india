"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setMsg("✅ Product added successfully");
      setForm({
        name: "",
        slug: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });
    } else {
      setMsg("❌ Error: " + data.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Add Product (Admin)</h1>

      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input className="w-full p-2 border" name="slug" placeholder="Slug (unique)" value={form.slug} onChange={onChange} required />
        <input className="w-full p-2 border" name="price" type="number" placeholder="Price" value={form.price} onChange={onChange} required />
        <input className="w-full p-2 border" name="category" placeholder="Category" value={form.category} onChange={onChange} required />
        <input className="w-full p-2 border" name="image" placeholder="Image URL (optional)" value={form.image} onChange={onChange} />
        <textarea className="w-full p-2 border" name="description" placeholder="Description" value={form.description} onChange={onChange} />

        <button disabled={loading} className="w-full bg-blue-600 text-white py-2">
          {loading ? "Saving..." : "Add Product"}
        </button>
      </form>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
}
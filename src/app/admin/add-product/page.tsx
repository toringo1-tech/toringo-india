"use client";
import { useState } from "react";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
    slug: "",
  });

  const handleChange = (e:any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Product Added Successfully ✅");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <input className="input" name="name" placeholder="Product Name" onChange={handleChange} />
      <input className="input" name="slug" placeholder="Slug (cement, bricks)" onChange={handleChange} />
      <input className="input" name="price" placeholder="Price" onChange={handleChange} />
      <input className="input" name="category" placeholder="Category" onChange={handleChange} />
      <input className="input" name="image" placeholder="Image URL" onChange={handleChange} />
      <textarea className="input" name="description" placeholder="Description" onChange={handleChange} />

      <button onClick={saveProduct} className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Product
      </button>
    </div>
  );
}
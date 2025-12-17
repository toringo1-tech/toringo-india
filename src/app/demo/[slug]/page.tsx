"use client";

import { useState } from "react";

export default function DemoBookingPage({ params }: any) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    date: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    alert(`
Demo Visit Booked ✅

Product: ${params.slug}
Name: ${form.name}
Mobile: ${form.mobile}
Date: ${form.date}
`);

    setForm({ name: "", mobile: "", address: "", date: "" });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 capitalize">
        Book Demo / Site Visit
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Your Name"
          className="w-full border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Mobile Number"
          className="w-full border p-2"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />

        <input
          placeholder="Address"
          className="w-full border p-2"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />

        <input
          type="date"
          className="w-full border p-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded"
        >
          Confirm Demo Visit
        </button>
      </form>
    </div>
  );
}
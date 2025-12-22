// components/DesktopHeader.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DesktopHeader() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const search = () => {
    if (!q.trim()) return;
    router.push(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="hidden md:flex items-center gap-4 bg-orange-600 text-white px-6 py-3">
      <Link href="/" className="font-bold text-lg">
        TORINGO INDIA
      </Link>

      <div className="flex flex-1">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search cement, sand, tiles..."
          className="flex-1 px-3 py-2 text-black rounded-l"
        />
        <button
          onClick={search}
          className="bg-orange-800 px-4 rounded-r"
        >
          🔍
        </button>
      </div>

      <select className="text-black px-2 py-1 rounded">
        <option>Categories</option>
        <option>Cement</option>
        <option>Sand</option>
        <option>Bricks</option>
      </select>

      <select className="text-black px-2 py-1 rounded">
        <option>Account</option>
        <option>Login</option>
        <option>Orders</option>
      </select>

      <Link href="/cart">🛒 Cart</Link>
    </header>
  );
}
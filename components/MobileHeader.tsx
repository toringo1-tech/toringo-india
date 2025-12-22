"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileHeader() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const search = () => {
    if (!q.trim()) return;
    router.push(`/?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="md:hidden bg-orange-600 text-white p-3">
      <h1 className="text-center font-bold mb-2">
        TORINGO INDIA
      </h1>

      <div className="flex">
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
    </header>
  );
}
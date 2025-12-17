"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;

    if (!u) {
      router.replace("/login");
    } else {
      setUser(u);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    router.replace("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded shadow p-4">
        <h1 className="text-xl font-bold mb-4">My Account</h1>

        {/* User Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">Logged in as</p>
          <p className="font-medium">
            {user.name || "User"} ({user.phone || "N/A"})
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            My Orders
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
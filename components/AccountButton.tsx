"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/auth";

export default function AccountButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    router.push("/");
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="text-sm text-white bg-orange-600 px-3 py-1 rounded"
      >
        Login
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">
        Hi, {user.name}
      </span>
      <button
        onClick={handleLogout}
        className="text-sm border border-orange-600 text-orange-600 px-3 py-1 rounded"
      >
        Logout
      </button>
    </div>
  );
}
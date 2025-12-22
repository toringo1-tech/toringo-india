"use client";

import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    loginUser({
      name: "Toringo User",
      email: "user@toringo.in",
    });
    router.push("/");
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="w-full bg-orange-600 text-white py-2 rounded"
      >
        Login (Demo)
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  // STEP 1: Send OTP (Dummy)
  const sendOtp = () => {
    if (!value) {
      alert("Enter mobile number or email");
      return;
    }
    setOtpSent(true);
  };

  // STEP 2: Verify OTP (Dummy login)
  const verifyOtp = () => {
    setLoading(true);

    // 🔐 LOGIN (IMPORTANT)
    login({
      id: "user-1", // REQUIRED
      name: "Toringo User",
      email: value,
    });

    const redirect =
      localStorage.getItem("redirectAfterLogin") || "/";
    localStorage.removeItem("redirectAfterLogin");

    router.push(redirect);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-6 rounded shadow">
        <h1 className="text-xl font-semibold text-center mb-4">
          Login
        </h1>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Mobile number or Email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        {/* SEND OTP */}
        {!otpSent && (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send OTP
          </button>
        )}

        {/* VERIFY OTP */}
        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP (any number)"
              className="w-full border p-2 rounded mb-4 mt-4"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded"
            >
              {loading ? "Verifying..." : "Verify & Login"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [value, setValue] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const sendOtp = () => {
    if (!value) {
      alert("Enter mobile number or email");
      return;
    }
    setOtpSent(true);
  };

  const verifyOtp = () => {
    if (otp !== "1234") {
      alert("Invalid OTP (use 1234)");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: Date.now(),
        value,
      })
    );

    window.location.href = "/account";

    const handleLogin = () => {
  // demo login
  localStorage.setItem(
    "user",
    JSON.stringify({ name: "Toringo User" })
  );

  const redirectTo =
    localStorage.getItem("redirectAfterLogin") || "/";

  localStorage.removeItem("redirectAfterLogin");

  window.location.href = redirectTo;
};

  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>

      {!otpSent ? (
        <>
          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Mobile number or Email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            Send OTP
          </button>
        </>
      ) : (
        <>
          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Enter OTP (1234)"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-green-600 text-white p-2 rounded"
          >
            Verify & Login
          </button>
        </>
      )}
    </div>
  );
}
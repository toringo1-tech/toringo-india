"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<any>(null);
  const [showCategories, setShowCategories] = useState(false);

  // get user from localStorage
  useEffect(() => {
    const u =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("user") || "null")
        : null;
    setUser(u);
  }, []);

  // account click handler (LOGIN / ACCOUNT)
  const handleAccountClick = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", pathname);
      router.push("/login");
    } else {
      router.push("/account");
    }
  };

  return (
    <>
      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t shadow z-40">
        <div className="flex justify-around items-center py-2 text-xs">

          {/* HOME */}
          <button
            onClick={() => router.push("/")}
            className="flex flex-col items-center"
          >
            🏠
            <span>Home</span>
          </button>

          {/* CATEGORIES */}
          <button
            onClick={() => setShowCategories(true)}
            className="flex flex-col items-center"
          >
            📂
            <span>Categories</span>
          </button>

          {/* SERVICES */}
          <button
            onClick={() => router.push("/services")}
            className="flex flex-col items-center"
          >
            🛠
            <span>Services</span>
          </button>

          {/* ACCOUNT (PROTECTED) */}
          <button
            onClick={handleAccountClick}
            className="flex flex-col items-center"
          >
            👤
            <span>Account</span>
          </button>
        </div>
      </div>

      {/* ================= CATEGORIES DRAWER ================= */}
      {showCategories && (
        <div
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setShowCategories(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-lg p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-3">Categories</h3>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <button
                onClick={() => {
                  setShowCategories(false);
                  router.push("/category/home-cleaning");
                }}
                className="border p-2 rounded"
              >
                Home Cleaning
              </button>

              <button
                onClick={() => {
                  setShowCategories(false);
                  router.push("/category/painting");
                }}
                className="border p-2 rounded"
              >
                Painting
              </button>

              <button
                onClick={() => {
                  setShowCategories(false);
                  router.push("/category/plumbing");
                }}
                className="border p-2 rounded"
              >
                Plumbing
              </button>

              <button
                onClick={() => {
                  setShowCategories(false);
                  router.push("/category/electrical");
                }}
                className="border p-2 rounded"
              >
                Electrical
              </button>
            </div>

            <button
              onClick={() => setShowCategories(false)}
              className="mt-4 w-full bg-gray-200 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQty = cart.reduce(
        (sum: number, item: any) => sum + (item.qty || 1),
        0
      );
      setCartCount(totalQty);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () =>
      window.removeEventListener("storage", updateCartCount);
  }, []);
     
  const [showCategories, setShowCategories] = useState(false);

    const user = 
    typeof window !== "undefined" 
    ? 
    JSON.parse(localStorage.getItem("user") || 
 "null"): null;

          const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("redirectAfterLogin");
  router.push("/login");
};

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <header className="md:hidden w-full bg-blue-600 text-white shadow">
        <div className="flex items-center gap-2 px-3 py-2">
          <Link href="/" className="font-bold text-lg">
            Toringo
          </Link>

          <input
            type="text"
            placeholder="Search..."
            className="flex-1 rounded px-3 py-1 text-black"
          />

          <Link href="/cart" className="relative">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ================= DESKTOP HEADER ================= */}
      <header className="hidden md:block w-full bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto flex items-center gap-4 px-6 py-3">
          <Link href="/" className="text-xl font-bold">
            Toringo
          </Link>

          <input
            type="text"
            placeholder="Search products, services..."
            className="flex-1 rounded-md px-4 py-2 text-black outline-none"
          />

          <div
  className="relative"
  onMouseEnter={() => setShowCategories(true)}
  onMouseLeave={() => setShowCategories(false)}
>
  {/* Categories Button */}
  <button className="hover:bg-blue-700 px-3 py-2 rounded flex items-center gap-1">
    📂 <span>Categories</span>
  </button>

  {/* Dropdown */}
  {showCategories && (
    <div className="absolute top-full mt-2 left-0 bg-white text-black rounded shadow-lg w-56 z-50">
      <ul className="py-2 text-sm">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link href="/category/building-material">
         Building Material
         </Link>
          </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
           <Link href="/category/home-cleaning">
         Home Cleaning
         </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
           <Link href="/category/home-care">
         Home Care
         </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
           <Link href="/category/gardening">
         Gardening
         </Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
           <Link href="/category/painting">
         Painting
         </Link>
        </li>
      </ul>
    </div>
  )}
</div>

               {user ? (
  <div className="flex items-center gap-4">
    <Link href="/account" className="text-sm font-medium">
      My Account
    </Link>

    <button
      onClick={handleLogout}
      className="text-sm bg-red-600 text-white px-3 py-1 rounded"
    >
      Logout
    </button>
  </div>
) : (
  <Link href="/login" className="text-sm font-medium">
    Login
  </Link>
)}

          <Link
            href="/cart"
            className="relative hover:bg-blue-700 px-3 py-2 rounded"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
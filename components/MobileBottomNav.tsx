"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Grid, ShoppingCart, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const itemClass = (path: string) =>
    `flex flex-col items-center gap-1 text-xs ${
      pathname === path ? "text-orange-600" : "text-gray-600"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 md:hidden z-50">
      {/* Home */}
      <button onClick={() => router.push("/")} className={itemClass("/")}>
        <Home size={20} />
        Home
      </button>

      {/* Categories */}
      <button
        onClick={() => router.push("/categories")}
        className={itemClass("/categories")}
      >
        <Grid size={20} />
        Categories
      </button>

      {/* Cart */}
      <button
        onClick={() => router.push("/cart")}
        className={itemClass("/cart")}
      >
        <ShoppingCart size={20} />
        Cart
      </button>

      {/* Account */}
      <button
        onClick={() => {
          const user = localStorage.getItem("user");
          router.push(user ? "/account" : "/login");
        }}
        className={itemClass("/login")}
      >
        <User size={20} />
        Account
      </button>
    </div>
  );
}
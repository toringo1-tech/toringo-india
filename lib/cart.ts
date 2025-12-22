"use client";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  qty: number;
};

/* Get all cart items */
export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

/* Add item to cart */
export function addToCart(product: any) {
  const cart = getCartItems();

  const existing = cart.find((i: CartItem) => i._id === product._id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Remove item */
export function removeFromCart(id: string) {
  const cart = getCartItems().filter((i) => i._id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Clear cart */
export function clearCart() {
  localStorage.removeItem("cart");
}
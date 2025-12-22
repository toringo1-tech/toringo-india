// app/page.tsx
import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  name: string;
  price?: number;
  image?: string;
};

async function getProducts(search?: string): Promise<Product[]> {
  try {
    const url = search
      ? `http://localhost:3000/api/products?q=${search}`
      : `http://localhost:3000/api/products`;

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || "";
  const products = await getProducts(query);

  return (
    <main className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        {query ? `Search result for "${query}"` : "Popular Products"}
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
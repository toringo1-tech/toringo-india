async function getCategories() {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store",
  });
  return res.json();
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat: any) => (
          <a
            key={cat._id}
            href={`/?q=${cat.slug}`}
            className="border rounded-lg p-4 text-center hover:bg-orange-50 transition"
          >
            <div className="text-lg font-semibold text-orange-600">
              {cat.name}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
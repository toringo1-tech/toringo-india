export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Category: {params.slug}
      </h1>

      <p className="mt-2 text-gray-600">
        Yahan {params.slug} ke products aayenge
      </p>
    </div>
  );
}
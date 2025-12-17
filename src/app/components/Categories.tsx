import Link from "next/link";
export default function Categories() {
  const categories = [
    { name: "Building Material", slug: "building-material", icon: "🏗" },
    { name: "Home Cleaning", slug: "home-cleaning", icon: "🧹" },
    { name: "Home Care", slug: "home-care", icon: "🏠" },
    { name: "Gardening", slug: "gardening", icon: "🌱" },
    { name: "Painting", slug: "painting", icon: "🎨" },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>

      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-4
      ">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="
              flex 
              flex-col 
              items-center 
              justify-center 
              border 
              rounded-xl 
              p-4 
              bg-white 
              shadow-sm 
              hover:shadow-md 
              transition
            "
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <p className="text-sm text-center">{cat.name}</p>
        
    </Link>
      ))}
      </div>
      </section>
   );

}

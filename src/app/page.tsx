import Categories from "./components/Categories";
import Services from "./components/Services";
export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      {/* Hero */}
      <h1 className="text-2xl md:text-3xl font-bold text-center mt-6">
        Welcome to Toringo India IN
      </h1>
      <p className="text-center text-gray-600 mt-2">
        All building materials, home services & contractors at one place
      </p>

      {/* Categories */}
      <Categories />

      {/* Services */}
      <Services />
    </main>
  );
}
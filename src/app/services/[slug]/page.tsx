import Link from "next/link";

export default function ServicePage({ params }: any) {
  const serviceName = params.slug.replace("-", " ");
  const price = 499; // example price

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold capitalize mb-2">
        {serviceName}
      </h1>

      <p className="mb-2">Service Price: ₹{price}</p>

      <Link
        href={`/checkout?type=service&name=${params.slug}&price=${price}`}
        className="block bg-blue-600 text-white text-center p-3 rounded"
      >
        Buy Service
      </Link>
    </div>
  );
}
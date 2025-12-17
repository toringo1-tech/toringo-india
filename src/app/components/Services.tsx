export default function Services() {
  const services = [
    { name: "Electrician", icon: "⚡" },
    { name: "Plumber", icon: "🚰" },
    { name: "Painter", icon: "🎨" },
    { name: "Carpenter", icon: "🪚" },
    { name: "AC Repair", icon: "❄" },
    { name: "Cleaning", icon: "🧹" },
  ];

  return (
    <section className="mt-8 px-4">
      <h2 className="text-lg font-semibold mb-4">Popular Services</h2>

      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.name}
            className="border rounded-lg p-4 text-center bg-white shadow-sm active:scale-95 transition"
          >
            <div className="text-2xl mb-2">{service.icon}</div>
            <p className="text-sm font-medium">{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
const features = [
  { title: "Fast Orders", desc: "Order from mobile or web" },
  { title: "Live Updates", desc: "Track your order status" },
  { title: "Smart Billing", desc: "GST-enabled digital receipts" },
];

export default function Features() {
  return (
    <section className="bg-white py-16 text-center">
      <h3 className="text-3xl font-bold mb-10 text-gray-800">Why CanteenX?</h3>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {features.map((f, i) => (
          <div key={i} className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-xs">
            <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

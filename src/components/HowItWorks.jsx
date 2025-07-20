const steps = [
  { step: "1. Browse", desc: "Check out today's menu online" },
  { step: "2. Order", desc: "Select items & confirm payment" },
  { step: "3. Pickup", desc: "Receive a notification when it's ready" },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-16 text-center">
      <h3 className="text-3xl font-bold mb-10 text-gray-800">How It Works</h3>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4">
        {steps.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-md max-w-xs">
            <h4 className="text-xl font-semibold text-orange-500 mb-2">{s.step}</h4>
            <p className="text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CTA() {
  return (
    <section className="bg-orange-500 py-12 text-center text-white">
      <h3 className="text-3xl font-bold mb-4">Ready to Skip the Queue?</h3>
      <p className="mb-6 text-lg">Order your meal now and save time!</p>
      <a href="/menu">
        <button className="bg-white text-orange-600 px-6 py-3 rounded font-semibold hover:bg-orange-100">
          Explore Menu
        </button>
      </a>
    </section>
  );
}

import heroBg from '../assets/hero-img.jpg';

export default function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center text-center px-6"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      {/* ✅ Full Image Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div> */}

      {/* ✅ Text Content above overlay */}
      <div className="relative z-10 text-white max-w-3xl">
        <h2 className="text-5xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          Welcome to Ezzy Canteen
        </h2>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
          Delicious and Instant meals and snacks at your fingertips.
        </p>
        <a href="/menu">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-8 py-4 rounded-xl transition shadow-md">
            View Menu
          </button>
        </a>
      </div>
    </section>
  );
}

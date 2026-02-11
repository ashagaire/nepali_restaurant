export default function Hero() {
  return (
    <section>
      <div className=" py-12 container mx-auto max-w-7xl p-4">
        <div
          className="text-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          <div className="bg-black bg-opacity-50 p-10 rounded">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
              Welcome to Our Nepali Restaurant
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 mb-6">
              Experience the authentic flavors of Nepal in every bite.
            </p>
            <a
              href="/menu"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
            >
              Explore Our Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import styles from "@/styles/Hero.module.css"; // Import the external CSS module
import ScrollingText from "./ScrollingText";

export default function Hero() {
  return (
    <section>
      {/* takes full width of the screen */}
      <div className="">
        <div className="text-center relative bg-cover bg-center h-[50vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/banner3.jpg')",
              opacity: 0.7, // Apply opacity only to the background
            }}
          ></div>
          <div className=" p-10 relative z-10">
            <h2 className="hero-heading">
              Experience Authentic Nepalese Flavor
            </h2>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="/lunch"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded  hover:bg-red-700 transition border-2 border-white"
              >
                Lunch
              </a>
              <a
                href="/menu"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition border-2 border-white"
              >
                Menu
              </a>
              <a
                href="/alacarte"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition border-2 border-white"
              >
                Alacarte
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-red-700 py-4">
        <div className="text-3xl font-bold mb-4 text-center text-yellow-500   whitespace-nowrap ">
          <ScrollingText />
        </div>
      </div>
    </section>
  );
}

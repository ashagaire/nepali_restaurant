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
            <h2 className="hero-heading text-orange-900">
              Experience Authentic Nepalese Flavor
            </h2>
            <div className=" flex justify-center gap-4">
              <a
                href="/lunch"
                className="inline-block bg-blue-400 text-l font-bold  text-center text-yellow-900 px-6 py-2 rounded  hover:bg-blue-500 transition border-3 border-white"
              >
                Lunch
              </a>
              <a
                href="/menu"
                className="inline-block bg-blue-400 text-l font-bold  text-center text-yellow-900 px-6 py-2 rounded  hover:bg-blue-500 transition border-3 border-white"
              >
                Menu
              </a>
              <a
                href="/alacarte"
                className="inline-block bg-blue-400 text-l font-bold  text-center text-yellow-900 px-6 py-2 rounded  hover:bg-blue-500 transition border-3 border-white"
              >
                Alacarte
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 py-2">
        <div className="text-xl font-bold  text-center text-yellow-700   whitespace-nowrap ">
          <ScrollingText />
        </div>
      </div>
    </section>
  );
}

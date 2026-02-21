"use client";
import styles from "@/styles/Hero.module.css"; // Import the external CSS module
import ScrollingText from "./ScrollingText";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="">
      {/* takes full width of the screen */}
      <div className="">
        <div className="text-center relative bg-cover bg-center h-[30vh] md:h-[30vh] lg:h-[40vh] flex items-center o">
          <div
            className="absolute inset-0 bg-cover bg-center "
            style={{
              backgroundImage: "url('/images/bannersidespace.jpg')",
              opacity: 1, // Apply opacity only to the background
            }}
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/3 md:translate-x-0   flex flex-col items-center justify-center text-white px-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 sm:mb-4">
              Experience Authentic Flavor
            </h2>
            <p className="text-sm sm:text-sm md:text-lg text-gray-600 sm:mb-4 text-center ">
              Exceed your expectations with our flavorful dishes and exceptional
              customer service.
            </p>
            <div className="flex mt-4  gap-2 md:gap-4">
              <Button
                component={Link}
                href="/lunch"
                variant="contained"
                color="primary"
                size="small"
                className="hero-button"
              >
                Lunch
              </Button>
              <Button
                component={Link}
                href="/menu"
                variant="contained"
                color="primary"
                size="small"
                className="hero-button"
              >
                Order
              </Button>
              <Button
                component={Link}
                href="/alacarte"
                variant="contained"
                color="primary"
                size="small"
                className="hero-button"
              >
                Alacarte
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-100 py-2">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold  text-center text-yellow-700   whitespace-nowrap ">
          <ScrollingText />
        </div>
      </div>
    </section>
  );
}

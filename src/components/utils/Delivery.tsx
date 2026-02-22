"use client";
import Services from "./Services";
import ScrollingText from "./ScrollingText";

import Link from "next/link";

export default function Delivery() {
  return (
    <section className=" bg-orange-200 text-yellow-700 ">
      <Services />
      <div className="bg-orange-300 py-2 mx-auto max-w-7xl lg:rounded-4xl">
        <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold  text-center text-yellow-700   whitespace-nowrap ">
          <ScrollingText />
        </div>
      </div>
      <div className="pb-12 lg:py-12 container mx-auto max-w-7xl p-4  text-center ">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
        <h3 className="text-large md:text-2xl  mb-6 max-w-3xl mx-auto">
          Checkout the available menu and order instantly.
          <br />
          You can also place your order online via Foodora and Wolt.
        </h3>
        <div className="flex flex-row gap-8 justify-center items-center">
          <Link
            href="/menu"
            className="hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="images/logoonly.png"
              alt="Foodora Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>
          <Link
            href="https://wolt.com/fi/discovery"
            className="hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="images/wolt.png"
              alt="Wolt Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>
          <Link
            href="https://www.foodora.fi/en/restaurants/new?lng=24.937976&lat=60.169869&vertical=restaurants"
            className="hover:opacity-80 transition-opacity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="images/foodora.png"
              alt="Foodora Logo"
              className="h-20 w-auto object-contain"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import PopularDishes from "./PopularDishes";

export default function FusionSection() {
  return (
    <section
      className="pt-8 lg:py-12  container mx-auto max-w-7xl relative bg-fixed bg-cover bg-center px-4 lg:px-0 "
      // style={{ backgroundImage: "url('/images/longbg2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/0 pointer-events-none" />
      <div className="flex  justify-start ">
        <h2 className="text-2xl md:text-3xl mb-2 lg:mb-6 font-bold text-yellow-700     ">
          Most Popular Dishes
        </h2>
      </div>
      <div className="relative z-10  rounded-xl">
        <PopularDishes />
      </div>
    </section>
  );
}

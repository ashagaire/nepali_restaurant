"use client";

import PopularDishes from "./PopularDishes";

export default function FusionSection() {
  return (
    <section
      className="pt-12 lg:py-12  container mx-auto max-w-7xl relative bg-fixed bg-cover bg-center "
      // style={{ backgroundImage: "url('/images/longbg2.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/0 pointer-events-none" />
      <div className="flex  justify-center ">
        <h2 className="text-3xl md:text-4xl mb-6 font-bold text-yellow-700  rounded-lg px-4 md:px-6 lg:px-8  ">
          Popular Dishes in Fusion Nepal
        </h2>
      </div>
      <div className="relative z-10 bg-orange-200 xl:rounded-4xl">
        <PopularDishes />
      </div>
    </section>
  );
}

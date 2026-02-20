"use client";

import Services from "./Services";
import PopularDishes from "./PopularDishes";

export default function FusionSection() {
  return (
    <section
      className=" relative bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/images/aboutbanner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <div className="relative z-10">
        <PopularDishes />
        <Services />
      </div>
    </section>
  );
}

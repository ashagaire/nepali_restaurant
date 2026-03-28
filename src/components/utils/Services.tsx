"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Package, Calendar, UtensilsCrossed, BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
  { 
    label: "Online Ordering", 
    description: "Authentic Himalayan flavors delivered fresh to your door.",
    icon: ShoppingBag, 
    // Mobile: 1 col | Tablet: 2 col | Desktop: 3 col
    className: "col-span-1 md:col-span-2 lg:col-span-3 lg:row-span-2 bg-orange-100 text-orange-900", 
    href: "/menu"
  },
  { 
    label: "Table Reservation", 
    description: "Book your cozy corner for an evening of spices.",
    icon: Calendar, 
    className: "col-span-1 md:col-span-1 lg:col-span-2 bg-white border border-orange-100", 
    href: "/reservation"
  },
  { 
    label: "Take Away", 
    description: "Freshly packed and ready.",
    icon: Package, 
    className: "col-span-1 md:col-span-1 lg:col-span-2 bg-white border border-orange-100",
    href: "/menu"
  },
  { 
    label: "Catering", 
    description: "Premium Nepali feasts for your special events.",
    icon: UtensilsCrossed, 
    className: "col-span-1 md:col-span-2 lg:col-span-2 bg-stone-900 text-white",
    href: "/contact"
  },
  { 
    label: "Menu", 
    description: "Explore our regions.",
    icon: BookOpen, 
    className: "col-span-1 md:col-span-2 lg:col-span-1 bg-orange-50 text-orange-800",
    href: "/menu"
  }
];

export default function Services() {
  return (
    <section className="py-12 bg-[#FFFBF7]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header - Balanced for all screens */}
        <div className="text-center lg:text-left mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-gray-600 max-w-lg">
            Experience the warmth of Nepali hospitality through our curated dining and delivery services.
          </p>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-[minmax(160px,auto)]">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative overflow-hidden rounded-[2rem] p-8 flex flex-col justify-between transition-all ${service.className}`}
            >
              <div className="flex justify-between items-start z-10">
                <div className={`p-3 rounded-2xl ${service.className.includes('bg-white') ? 'bg-orange-50 text-orange-500' : 'bg-white/20 text-white'}`}>
                  <service.icon size={26} />
                </div>
                <Link href={service.href}>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" />
                </Link>
              </div>

              <div className="z-10 mt-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2">{service.label}</h3>
                <p className={`text-sm leading-relaxed ${service.className.includes('bg-white') ? 'text-gray-500' : 'opacity-80'}`}>
                  {service.description}
                </p>
              </div>

              {/* Subtle Decorative Background Element for the Light Orange card */}
              {service.label === "Online Ordering" && (
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-orange-200/50 rounded-full blur-3xl" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Partners Row - Responsive scaling */}
        <div className="mt-8 pt-8 border-t border-orange-100 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
           <p className="text-sm font-bold tracking-widest text-orange-300 uppercase">Partnered with</p>
           <div className="flex flex-wrap justify-center items-center gap-8 opacity-80 hover:opacity-100">
             <img src="images/wolt.png" alt="Wolt" className="h-16 md:h-20 object-contain" />
             <img src="images/foodora.png" alt="Foodora" className="h-16 md:h-20 object-contain" />
           </div>
        </div>
      </div>
    </section>
  );
}
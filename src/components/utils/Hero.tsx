"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, Typography } from "@mui/material";

const slides = [
  { url: "/slideImages/curry.jpg", alt: "Indian Curry" },
  { url: "/slideImages/fire.jpg", alt: "Fire" },
  { url: "/slideImages/dinner.jpg", alt: "Dinner" },
  { url: "/slideImages/fried momo.jpg", alt: "Fried Momo" },
  { url: "/slideImages/fire2.jpg", alt: "Fire2" }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[60vh] bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden">
      {/* Invisible SVG definition crucial for responsive clipPath */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="blob-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.075,0.046 Q 0.5,0 0.925,0.046 C 1,0.385 0.875,0.692 0.925,0.954 Q 0.5,1 0.075,0.954 C 0,0.692 0.125,0.385 0.075,0.046 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="container mx-auto max-w-7xl px-4 py-12 lg:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-2 md:gap-4 items-center">
          
          {/* 1. Title Area - Shows first on Mobile, Top-Left on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:col-start-1 lg:row-start-1 lg:self-end w-full"
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, sm: 45, lg: 80 } }}
            >
              <span className="block  text-center lg:text-left text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Helsinki Spice Ravintola
              </span>
            </Typography>
          </motion.div>

          {/* 2. Image Area - Shows second on Mobile (between title & paragraph), Spanning Right on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative flex justify-center w-full my-2 md:my-8 lg:my-0"
          >
            {/* Wrapper for responsive sizing and drop shadow */}
            <div className="relative w-full max-w-[500px] aspect-[400/500] drop-shadow-2xl">
              {/* Inner container with the responsive percentage-based SVG clip-path */}
              <div 
                className="absolute inset-0 bg-white"
                style={{ clipPath: "url(#blob-clip)" }}
              >
                <AnimatePresence>
                  <motion.img
                    key={currentSlide}
                    src={slides[currentSlide].url}
                    alt={slides[currentSlide].alt}
                    initial={{ opacity: 0, x: 50, filter: "blur(12px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, x: -50, filter: "blur(12px)" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Slide Indicators */}
              <div className="absolute z-10 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === currentSlide ? "bg-white w-8" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 -right-2 md:-right-6 w-24 h-24 bg-orange-300 rounded-full opacity-20 blur-2xl -z-10" />
            <div className="absolute bottom-4 -left-2 md:-left-6 w-32 h-32 bg-red-300 rounded-full opacity-20 blur-2xl -z-10" />
          </motion.div>

          {/* 3. Text & Buttons Area - Shows third on Mobile, Bottom-Left on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start space-y-4 lg:space-y-6 w-full"
          >
            <Typography
              variant="h6"
              align="left"
              className="text-gray-700"
              sx={{
                py: { xs: 2, lg: 4 },
                fontWeight: 400,
                lineHeight: 1.4,
                textAlign: "justify",
                fontSize: { xs: '0.90rem', md: '1.25rem' }
              }}
            >
              Embark on a culinary journey through the rich flavors of Nepal. Our authentic, 
              generation-passed recipes are crafted with the finest spices and freshest ingredients. 
              From aromatic biryanis and momos to creamy curries, experience our warm hospitality.
            </Typography>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
              <Link href="/menu">
                <button className="px-4 py-2 md:px-8 md:py-3 text-sm md:text-base font-medium bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  View Menu
                </button>
              </Link>
              <Link href="/lunch">
                <button className="px-4 py-2 md:px-8 md:py-3 text-sm md:text-base font-medium bg-yellow-500 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  Lunch Specials
                </button>
              </Link>
              <Link href="/alacarte">
                <button className="px-4 py-2 md:px-8 md:py-3 text-sm md:text-base font-medium bg-green-600 text-white rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all">
                  A La Carte
                </button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

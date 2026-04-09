"use client";
import { useState } from "react";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="md:py-12 py-6 ">
      <div className=" container mx-auto max-w-4xl px-4 ">
        <Typography
              variant="h3"
              align="center"
              sx={{ fontWeight: 700, my:  2, fontSize: { xs: 30, md: 50, lg: 60 } }}
            >
              <span className="block text-transparent leading-tight bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                About Us
              </span>
            </Typography>

        <section className="mb-16">
          <h2 className="md:text-4xl text-2xl font-bold mb-6 text-orange-600">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            <div className=" max-w-none text-gray-800 space-y-6 leading-relaxed flex-1">
              <p>
                Fusion Nepal was founded with a simple dream, to bring the
                authentic flavors of Nepal to the heart of Helsinki. Our journey
                began in 2018 when our head chef, trained in the mountain
                villages of Nepal, decided to share the recipes passed down
                through generations of his family.
                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="md:hidden inline text-orange-600 font-semibold hover:text-orange-700 transition-colors ml-1 cursor-pointer"
                  >
                    Read more ...
                  </button>
                )}
              </p>
              
              {/* Desktop view: always visible */}
              <div className="hidden md:block space-y-6">
                <p>
                  Every dish we prepare carries the essence of Nepali hospitality
                  – warm, generous, and made with love. We use traditional cooking
                  methods and source authentic spices directly from Nepal to
                  ensure each bite transports you to the Himalayas.
                </p>

                <p>
                  Our team is dedicated to creating not just meals, but
                  experiences that celebrate the rich culinary heritage of Nepal.
                  We are committed to providing excellent service and ensuring
                  that every dining experience at Fusion Nepal is memorable.
                  Whether you're dining in, taking out, or having your meal
                  delivered, we strive to exceed your expectations with our
                  flavorful dishes and exceptional customer service.
                </p>
              </div>

              {/* Mobile view: collapsible */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="md:hidden space-y-6 overflow-hidden"
                  >
                    <p>
                      Every dish we prepare carries the essence of Nepali hospitality
                      – warm, generous, and made with love. We use traditional cooking
                      methods and source authentic spices directly from Nepal to
                      ensure each bite transports you to the Himalayas.
                    </p>

                    <p>
                      Our team is dedicated to creating not just meals, but
                      experiences that celebrate the rich culinary heritage of Nepal.
                      We are committed to providing excellent service and ensuring
                      that every dining experience at Fusion Nepal is memorable.
                      Whether you're dining in, taking out, or having your meal
                      delivered, we strive to exceed your expectations with our
                      flavorful dishes and exceptional customer service.
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="inline text-orange-600 font-semibold hover:text-orange-700 transition-colors ml-1 cursor-pointer"
                      >
                        Read less.
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <img src="/images/chef.webp" alt="Chef" className="w-full md:w-1/3 max-h-96 object-cover rounded-2xl shadow-lg border-2 border-orange-100" />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="md:text-4xl text-2xl font-bold mb-8 text-center text-orange-600">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-orange-100 rounded-xl">
              <div className="text-4xl mb-4">🍛</div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Authentic Recipes</h3>
              <p className="text-gray-600 text-sm">
                Traditional recipes passed down through generations
              </p>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-4xl mb-4">🥬</div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Fresh Ingredients</h3>
              <p className="text-gray-600 text-sm">
                Locally sourced produce with imported Nepali spices
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="font-semibold text-lg mb-2 text-orange-600">Warm Hospitality</h3>
              <p className="text-gray-600 text-sm">
                The spirit of Nepali 'Atithi Devo Bhava' - Guest is God
              </p>
            </div>
          </div>
        </section>

        <section className="bg-orange-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-600">Welcome!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto ">
            We look forward to serving you and sharing the flavors of Nepal with
            you.
          </p>
        </section>
      </div>
    </div>
  );
}

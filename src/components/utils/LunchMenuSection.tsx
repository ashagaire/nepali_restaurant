"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ChefHat } from "lucide-react";
import { lunchMenuData } from "@/data/lunch";

// Get current day of the week
const getDayOfWeek = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  return days[today];
};

export default function LunchMenuSection() {
  const today = getDayOfWeek();
  const isWeekday = today !== 'Saturday' && today !== 'Sunday';
  
  // Find today's menu from lunchMenuData (fallback to Monday if today is not found, or maybe just Monday's if weekend)
  const currentMenu = lunchMenuData.find(menu => menu.day === today) || lunchMenuData[0];
  const menuItems = currentMenu.items;

  return (
    <section className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ChefHat className="w-10 h-10 text-orange-600" />
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Today's Lunch Special
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We serve a delicious lunch buffet every weekday from <span className="font-semibold text-orange-600">10:00 AM - 15:00 PM</span>, 
              prepared fresh daily with the finest ingredients
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Menu Items */}
            <div className="space-y-6">
              {isWeekday ? (
                <>
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg inline-block">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{today}'s Menu</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
                    {menuItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600 bg-orange-100 p-4 rounded-lg">
                    <span className="text-2xl">✨</span>
                    <p>
                      <strong>Buffet includes:</strong> {currentMenu.notice}
                    </p>
                  </div>
                </>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <p className="text-xl text-gray-700 mb-4">
                    Our lunch buffet is available Monday through Friday.
                  </p>
                  <p className="text-gray-600">
                    Please visit us on a weekday to enjoy our special lunch buffet!
                  </p>
                </div>
              )}

              <Link href="/lunch" className="block">
                <button className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full hover:shadow-xl transform hover:-translate-y-1 transition-all text-lg font-semibold">
                  See Full Lunch Menu
                </button>
              </Link>
            </div>

            {/* Right Side - Square Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/buffet.jpg"
                  alt="Lunch Buffet"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-red-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg transform rotate-12">
                <p className="font-bold">Fresh Daily</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

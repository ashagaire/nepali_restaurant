"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, ShoppingCart, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { useMenuItems } from "@/hooks/menu/useMenuItems";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toDecimalNumber } from "@/lib/toDecimal";
import LoadingMeanuSection from "../Skeletons/loadingMenuSection";

export default function PopularDishes() {
  const { menuItems, loading, error } = useMenuItems();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const router = useRouter();
    const { addToCart, toggleCart } = useCart();

  if (loading) return <LoadingMeanuSection />;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

    const handleAddToCart = (itemPrice: any, itemDiscount: any) => {
      const price = toDecimalNumber(itemPrice);
      const discount = toDecimalNumber(itemDiscount);
      const hasDiscount = discount > 0;
      const finalPrice = hasDiscount ? price - (price * discount / 100) : price;
      addToCart({
        id: item.id,
        name: item.nameEn,
        price: finalPrice,
        quantity: 1,
        imageUrl: item.imageUrl || undefined,
      });
  
      toast.info("Go To Shopping Cart", {
        position: "top-right",
        autoClose: 2000,
        onClick: () => toggleCart(),
        className: "cursor-pointer font-bold ",
      });
    };
  const displayItems = menuItems.length > 0
    ? Array.from({ length: 5 }, (_, i) => menuItems[i % menuItems.length])
    : [];

  const count = displayItems.length;

  // Nothing to show yet (empty API response)
  if (count === 0) return null;

  const goNext = () => {
    if (currentIndex < count - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  };

  const goTo = (i: number) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };

 
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      rotateY: dir > 0 ? 15 : -15,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 100, damping: 22 },
        rotateY: { type: "spring" as const, stiffness: 100, damping: 22 },
        opacity: { duration: 0.4 },
        scale: { type: "spring" as const, stiffness: 100, damping: 22 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      rotateY: dir > 0 ? -15 : 15,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 100, damping: 22 },
        rotateY: { type: "spring" as const, stiffness: 100, damping: 22 },
        opacity: { duration: 0.4 },
        scale: { type: "spring" as const, stiffness: 100, damping: 22 },
      },
    }),
  };

  const item = displayItems[currentIndex];

  
  if (!item) return null;

  return (
    <section className="py-12 bg-[#FFFBF7] overflow-hidden">
      <div className="container mx-auto max-w-5xl px-4">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-2 text-orange-500 mb-2">
              <Flame size={20} fill="currentColor" />
              <span className="font-bold tracking-[0.2em] uppercase text-sm">Chef's Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Trending <span className="text-orange-500">Tastes</span>
            </h2>
          </div>
          <div className="hidden md:block justify-center mt-2">
          <Link
            href="/menu"
            className="mt-6 md:mt-0 group px-7 py-3.5 bg-orange-100 text-orange-600 rounded-2xl font-bold flex items-center gap-3 hover:bg-orange-200 transition-all text-sm"
          >
            Full Menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
          
        </div>

        {/* ── Card Deck + Controls ── */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Stack + Flip area */}
          <div className="flex-shrink-0 w-full max-w-[340px] mx-auto lg:mx-0">

            {/* Perspective wrapper */}
            <div
              className="relative"
              style={{ perspective: "1000px", height: "520px" }}
            >
              {/* Stack ghost cards behind (static depth layers) */}
              {[3, 2, 1].map((offset) => (
                <div
                  key={offset}
                  className="absolute inset-0 bg-white rounded-[2.5rem] border border-orange-100"
                  style={{
                    transform: `translateX(${offset * 7}px) translateY(${offset * 5}px)`,
                    zIndex: offset,
                    opacity: 1 - offset * 0.18,
                    boxShadow: "0 4px 20px rgba(255,138,0,0.06)",
                  }}
                />
              ))}

              {/* Animated front card */}
              <AnimatePresence custom={direction} mode="sync">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  /* ── Swipe / drag gesture ── */
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    const SWIPE_THRESHOLD = 60;
                    if (info.offset.x < -SWIPE_THRESHOLD) {
                      goNext();          // swipe left → next card
                    } else if (info.offset.x > SWIPE_THRESHOLD) {
                      goPrev();          // swipe right → previous card
                    }
                  }}
                  className="absolute inset-0 bg-white rounded-[2.5rem] border border-orange-100 p-5 flex flex-col cursor-grab active:cursor-grabbing"
                  style={{
                    zIndex: 10,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    boxShadow: "0 24px 64px rgba(255,138,0,0.18)",
                    touchAction: "pan-y", // allow vertical page scroll, intercept horizontal
                  }}
                >
                  

                  {/* Image */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-[2rem] mb-4 mt-2">
                    <img
                      src={item.imageUrl || "/images/banner1.jpg"}
                      alt={item.nameEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl font-black text-orange-600 shadow-sm text-sm">
                      €{Number(item.price).toFixed(2)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow flex flex-col px-1">
                    <div className="flex items-center gap-0.5 text-yellow-400 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                      <span className="text-gray-400 font-semibold text-xs ml-2">4.9</span>
                    </div>
                    <h3 className="text-lg font-semibold text-orange-600 mb-1 line-clamp-1">
                      {item.nameEn}
                    </h3>
                    <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed flex-grow">
                      {item.descriptionEn}
                    </p>
                    <button className="mt-4 w-full bg-orange-100 hover:bg-orange-500 text-orange-600 hover:text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 text-sm"
                    onClick={() => handleAddToCart(item.price, item.discount)} >
                      <ShoppingCart size={15} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Controls ── */}
            <div className="flex items-center justify-between mt-8 px-1">
              {/* Prev */}
              <motion.button
                onClick={goPrev}
                disabled={currentIndex === 0}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-2xl bg-white border border-orange-100 shadow-sm flex items-center justify-center text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-300 transition-all"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {displayItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "w-6 h-2.5 bg-orange-500"
                        : "w-2.5 h-2.5 bg-orange-200 hover:bg-orange-300"
                    }`}
                  />
                ))}
              </div>

              {/* Next */}
              <motion.button
                onClick={goNext}
                disabled={currentIndex === count - 1}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 rounded-2xl bg-orange-500 shadow-sm flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-orange-600 transition-all"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>

          {/* ── Side info panel (visible on lg+) ── */}
          <div className="hidden lg:flex flex-col gap-4 flex-1">

            {/* Text block — stable container, only content crossfades */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
                  className="absolute inset-0"
                >
                  <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">
                    Chef's Pick #{currentIndex + 1}
                  </p>
                  <h3 className="text-3xl font-bold text-orange-600 mb-3 leading-tight">
                    {item.nameEn}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    {item.descriptionEn}
                  </p>
                </motion.div>
              </AnimatePresence>
              {/* Stable spacer so the container keeps its height */}
              <div className="invisible" aria-hidden>
                <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Chef's Pick #0</p>
                <h3 className="text-3xl font-black text-orange-600 mb-3 leading-tight">{item.nameEn}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.descriptionEn}</p>
              </div>
            </div>

            {/* Price + stars — stable, no remount */}
            <div className="flex items-center gap-4">
              <motion.div
                key={`price-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.25 } }}
                className="text-3xl font-black text-orange-500"
              >
                €{Number(item.price).toFixed(2)}
              </motion.div>
              <div className="flex items-center gap-1 text-yellow-400 bg-yellow-50 px-3 py-1.5 rounded-xl">
                <Star size={14} fill="currentColor" />
                <span className="text-gray-700 font-bold text-sm">4.9</span>
              </div>
            </div>

            {/* Progress bar — animates smoothly, never remounts */}
            <div className="w-full h-1.5 bg-orange-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-400 rounded-full"
                animate={{
                  width: `${((currentIndex + 1) / count) * 100}%`,
                  transition: { type: "spring", stiffness: 120, damping: 20 },
                }}
              />
            </div>

            {/* Thumbnail strip — stable, only the active border moves */}
            <div className="flex gap-3 mt-2">
              {displayItems.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${
                    i === currentIndex
                      ? "border-orange-500 scale-110"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img
                    src={thumb.imageUrl || "/images/banner1.jpg"}
                    alt={thumb.nameEn}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          

        </div>
        <div className="flex md:hidden justify-center mt-2">
          <Link
            href="/menu"
            className="mt-6 md:mt-0 group px-7 py-3.5 bg-orange-100 text-orange-700 rounded-2xl font-bold flex items-center gap-3 hover:bg-orange-200 transition-all text-sm"
          >
            Full Menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
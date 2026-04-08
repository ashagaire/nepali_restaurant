"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import menuData from "@/data/helsinki-spice.json";

const sideImages = [
  "/squareImages/creamsoup.jpg",
  "/squareImages/fried momo.jpg",
  "/squareImages/spice and curry.jpg",
  "/squareImages/curry.jpg",
  "/squareImages/cake.jpg",
  "/squareImages/mangolassi.jpg",

];

export default function Alacarte() {
  const [activeSection, setActiveSection] = useState<string>("");
  let imageCounter = 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-250px 0px -40% 0px", threshold: 0 }
    );

    menuData.sections.forEach((s) => {
      const id = s.name.replace(/\s+/g, '-').toLowerCase();
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // We now chunk by 2 instead of 3
  const chunkArray = (array: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12 relative items-start bg-white pt-[80px]  xl:pt-0">
      {/* Mobile Sticky Nav */}
      <nav className="xl:hidden fixed top-[140px] md:top-[180px] lg:top-[180px] left-0 w-full z-20 bg-white py-2 md:py-4 px-6  md:px-4 md:overflow-x-auto md:whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <ul className="grid grid-cols-3 gap-2 sm:gap-3 md:flex md:items-center md:justify-center md:space-x-6 mt-2">
          {menuData.sections.map((s) => {
            const sectionId = s.name.replace(/\s+/g, '-').toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <li key={s.name} className="w-full">
                <a 
                  href={`#${sectionId}`} 
                  className={`flex justify-center items-center text-center w-full px-1 py-1.5 sm:py-2.5 md:px-5 md:py-2.5 rounded-md border-b text-[10px] sm:text-[11px] md:text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                    isActive 
                      ? 'bg-orange-50 border-orange-400 text-orange-600 shadow-[0_2px_10px_-3px_rgba(234,88,12,0.3)]' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50/30 hover:shadow-sm'
                  }`}
                >
                  <span className="truncate">{s.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Dummy spacer to hold the layout open since the sidebar is now strictly fixed out of flow */}
      <div className="hidden xl:block w-28 shrink-0" />

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden xl:block w-48 shrink-0 fixed top-[300px] z-20">
        <ul className="space-y-6 border-l-2 border-gray-100 pl-4">
          {menuData.sections.map((s) => {
            const sectionId = s.name.replace(/\s+/g, '-').toLowerCase();
            const isActive = activeSection === sectionId;
            return (
              <li key={s.name}>
                <a href={`#${sectionId}`} className={`block text-sm font-semibold tracking-wider uppercase transition-colors ${isActive ? 'text-orange-600' : 'text-gray-500 hover:text-orange-600'}`}>
                  {s.name}
                </a>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        {menuData.sections.map((section) => {
          const sectionId = section.name.replace(/\s+/g, '-').toLowerCase();
          return (
            <section 
              key={section.name} 
              id={sectionId}
              className="mb-16 scroll-mt-[220px] md:scroll-mt-[235px] lg:scroll-mt-[240px] xl:scroll-mt-[170px]"
            >
              {/* Section Header */}
              <div className="sticky top-[220px] md:top-[235px] lg:top-[240px] xl:top-[170px] z-10 bg-white py-4 lg:py-8  flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.1em] text-gray-950 uppercase text-center xl:mr-32 ">
                  {section.name}
                </h2>
                <div className="w-12 h-[2px] bg-orange-500 mt-2" />
              </div>

              <div className="space-y-12 px-4 md:px-8">
                {chunkArray(section.items, 2).map((group, gIdx) => {
                  // Show an image for the 1st group of every section (max 5)
                  const shouldShowImage = gIdx === 0 && imageCounter < sideImages.length;
                  const currentImage = shouldShowImage ? sideImages[imageCounter] : null;
                  const isImageLeft = imageCounter % 2 !== 0;

                  if (shouldShowImage) imageCounter++;

                  return (
                    <div 
                      key={gIdx} 
                      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center "
                    >
                      {/* Menu Items Column */}
                      <div className={`
                        ${currentImage ? "md:col-span-6" : "md:col-span-12"} 
                        ${currentImage && isImageLeft ? "md:order-2" : "md:order-1"}
                        space-y-8 lg:space-y-10
                      `}>
                        {group.map((item: any) => (
                          <div key={item.name} className="group">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-lg lg:text-xl xl:text-2xl font-serif italic text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                                {item.name.split('(')[0].trim()}
                              </h3>
                              <div className="flex-1 border-b border-gray-100 mx-4 h-px" />
                              <span className="text-lg lg:text-xl xl:text-2xl font-light text-gray-500 tabular-nums">{item.price}</span>
                            </div>
                            
                            {/* Minimalist Tags */}
                            <div className="flex flex-wrap gap-4 mb-2">
                              {extractTags(item.name).map((tag) => (
                                <span key={tag} className="text-[11px] font-bold tracking-widest text-orange-600 border-b border-orange-200 uppercase">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <p className="text-gray-600 font-light text-sm lg:text-base xl:text-lg leading-relaxed md:max-w-[85%] ">
                              {item.desc_en}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Image Column */}
                      {currentImage && (
                        <div className={`
                          md:col-span-6 h-[400px] relative rounded-sm overflow-hidden
                          ${isImageLeft ? "md:order-1" : "md:order-2"}
                        `}>
                          <Image
                            src={currentImage}
                            alt="Culinary highlight"
                            fill
                            className="object-cover transition-transform duration-1000 hover:scale-110"
                            sizes="(max-w-768px) 100vw, 600px"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

function extractTags(name: string): string[] {
  const match = name.match(/\(([^)]+)\)/);
  if (!match) return [];
  return match[1]
    .replace('MYÖS ', '')
    .split(/[, ]+/)
    .map(t => t.trim())
    .filter(t => t.length > 0 && isNaN(Number(t)));
}
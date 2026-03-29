"use client";

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
  let imageCounter = 0;

  // We now chunk by 2 instead of 3
  const chunkArray = (array: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-white">
      {menuData.sections.map((section) => (
        <section key={section.name} className="mb-12">
          {/* Section Header */}
          <div className="flex flex-col items-center mb-12 ">
            <h2 className="text-4xl font-serif font-light tracking-[0.1em] text-gray-950 uppercase text-center">
              {section.name}
            </h2>
            <div className="w-12 h-[2px] bg-orange-500 mt-6" />
          </div>

          <div className="space-y-12">
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
                    space-y-16
                  `}>
                    {group.map((item: any) => (
                      <div key={item.name} className="group">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-2xl font-serif italic text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                            {item.name.split('(')[0].trim()}
                          </h3>
                          <div className="flex-1 border-b border-gray-100 mx-4 h-px" />
                          <span className="text-xl font-light text-gray-500 tabular-nums">{item.price}</span>
                        </div>
                        
                        {/* Minimalist Tags */}
                        <div className="flex flex-wrap gap-4 mb-4">
                          {extractTags(item.name).map((tag) => (
                            <span key={tag} className="text-[11px] font-bold tracking-widest text-orange-600 border-b border-orange-200 uppercase">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-600 font-light text-lg leading-relaxed md:max-w-[85%]">
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
      ))}
    </main>
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
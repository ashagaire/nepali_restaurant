"use client";

import menuData from "@/data/helsinki-spice.json";

export default function HelsinkiSpice() {
  return (
    <main className=" px-6 py-12">
      {menuData.sections.map((section) => (
        <section key={section.name} className="mb-14">
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-6">
            {section.name}
          </h2>

          <div className="space-y-6">
            {section.items.map((item) => (
              <div
                key={`${section.name}-${item.id}`}
                className="flex flex-col md:flex-row md:justify-between md:items-start"
              >
                <div className="md:w-4/5">
                  <p className="font-medium text-lg">
                    {item.id}. {item.name}
                  </p>

                  {(item.desc_fi || item.desc_en) && (
                    <p className="text-sm text-gray-600 mt-1">
                      {item.desc_fi}
                      {item.desc_fi && item.desc_en && " / "}
                      {item.desc_en}
                    </p>
                  )}
                </div>

                <div className="md:w-1/5 text-right font-semibold text-lg mt-2 md:mt-0">
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

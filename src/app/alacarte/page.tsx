import AlacartePage from "@/components/menu/Alacarte";

export default function Alacarte() {
  return (
    <section className="py-12 bg-white container mx-auto max-w-7xl p-4 ">
      <div className="py-12 bg-whitecontainer mx-auto max-w-2xl p-4">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Alacarte Menu</h1>
          <p className="text-lg text-gray-600">
            Explore our selection of authentic Nepali dishes available for
            individual order
          </p>
        </div>
        {/* Alacarte menu items will go here */}
        <AlacartePage />
      </div>
    </section>
  );
}

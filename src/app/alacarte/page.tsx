import HelsinkiSpice from "@/components/menu/Alacarte";

export default function Alacarte() {
  return (
    <section className="py-12 bg-white container mx-auto max-w-4xl p-4 ">
      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-center mb-4">Helsinki Spice</h1>

        <h1 className=" text-2xl font-bold mb-4">Alacarte Menu</h1>
        <p className="text-lg text-gray-600">
          Explore our selection of authentic Nepali dishes available for
          individual order
        </p>
      </div>
      {/* Alacarte menu items will go here */}
      <HelsinkiSpice />
    </section>
  );
}

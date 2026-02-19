import PopularDishes from "@/components/utils/PopularDishes";
import Hero from "@/components/utils/Hero";
import OpeningDetails from "@/components/utils/OpeningDetails";
import Delivery from "@/components/utils/Delivery";
import Services from "@/components/utils/Services";
import FusionSection from "@/components/utils/FusionSection";
export default async function Home() {
  return (
    <main>
      <Hero />
      <FusionSection />
      <Delivery />
      <OpeningDetails />
    </main>
  );
}

import PopularDishes from "@/components/utils/PopularDishes";
import Hero from "@/components/utils/Hero";
import OpeningDetails from "@/components/utils/OpeningDetails";
import Delivery from "@/components/utils/Delivery";

export default async function Home() {
  return (
    <main>
      <Hero />
      <PopularDishes />
      <OpeningDetails />
      <Delivery />
    </main>
  );
}

import PopularDishes from "@/components/utils/PopularDishes";
import Hero from "@/components/utils/Hero";
import LunchMenuSection from "@/components/utils/LunchMenuSection";
import OpeningDetails from "@/components/utils/OpeningDetails";
import Services from "@/components/utils/Services";
import GoogleReviews from "@/components/utils/GoogleReviews";

export default async function Home() {
  return (
    <main className="lg:pb-12">
      <Hero />
      <LunchMenuSection />
      <Services />
      <PopularDishes />
      <GoogleReviews />
      <OpeningDetails />
    </main>
  );
}

import MenuSection from "@/components/menu/MenuSection";
import SearchOptions from "@/components/menu/SearchOptions";

export default async function Home() {
  return (
    <main className="container mx-auto max-w-7xl p-4">
      <SearchOptions />
      <MenuSection />
    </main>
  );
}

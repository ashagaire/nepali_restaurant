import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuSection from "@/components/menu/MenuSection";

export default async function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      {/* <Navbar /> */}
      <h1>Himalayan Taste</h1>
      <p>Authentic Nepali & Himalayan Cuisine</p>
      <MenuSection />
      <Footer />
    </main>
  );
}

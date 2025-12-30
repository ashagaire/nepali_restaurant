import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuSection from "@/components/MenuSection";

export default async function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <Header />
      <h1>Himalayan Taste</h1>
      <p>Authentic Nepali & Himalayan Cuisine</p>
      <MenuSection />
      <Footer />
    </main>
  );
}

import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Category";
import LandCard from "@/components/LandCard";
import ShowAllCategories from "@/components/ShowAllCategories";
import Footer from "@/components/Footer";
import RealEstate from "@/components/RealEstate";
import Interior from "@/components/Interior";
import Marble from "@/components/Marble";
import WhyUs from "@/components/WhyUs";
import Sanitary from "@/components/Sanitary";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <Categories />
      <section id="real-estate">
        <RealEstate />
      </section>
      <section id="land">
        <LandCard />
      </section>
      <section id="interior">
        <Interior />
      </section>
      <section id="marble">
        <Marble />
      </section>
      <section id="sanitary">
        <Sanitary />
      </section>
      <ShowAllCategories />
      <WhyUs />
      <Footer />
    </div>
  );
}

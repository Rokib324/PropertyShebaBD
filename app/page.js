import HeroSlider from "@/components/HeroSlider";
import Navbar from "@/components/Navbar";
import Categories from "@/components/Category";
import LandCard from "@/components/LandCard";
import ShowAllCategories from "@/components/ShowAllCategories";
import SpecialOffer from "@/components/SpecialOffer";
import Footer from "@/components/Footer";
import RealEstate from "@/components/RealEstate";
import Interior from "@/components/Interior";
export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <Categories />
      <LandCard />
      <RealEstate />
      <Interior />
      <ShowAllCategories />
      <SpecialOffer />
      <Footer />
    </div>
  );
}

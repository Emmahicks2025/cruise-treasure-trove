import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MainNav from "@/components/MainNav";
import SearchForm from "@/components/SearchForm";
import HeroCarousel from "@/components/HeroCarousel";
import CountdownBanner from "@/components/CountdownBanner";
import DailyDeals from "@/components/DailyDeals";
import ExclusiveOffers from "@/components/ExclusiveOffers";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import PopularCruises from "@/components/PopularCruises";
import SpecialOffers from "@/components/SpecialOffers";
import FeaturedDeals from "@/components/FeaturedDeals";
import WebinarBanner from "@/components/WebinarBanner";
import WhyBookWithUs from "@/components/WhyBookWithUs";
import Footer from "@/components/Footer";
import MemberBanner from "@/components/MemberBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <MainNav />
      <SearchForm />
      <HeroCarousel />
      <CountdownBanner />
      <DailyDeals />
      <ExclusiveOffers />
      <FeaturedDestinations />
      <PopularCruises />
      <SpecialOffers />
      <FeaturedDeals />
      <WebinarBanner />
      <WhyBookWithUs />
      <Footer />
      <MemberBanner />
    </div>
  );
};

export default Index;

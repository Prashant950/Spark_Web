import Header from "../components/layout/Header";
import Hero from "../components/hero/Hero";
import SupportAcrossIndia from "../components/support/SupportAcrossIndia";
import Services from "../components/services/Services";
import WhyChooseUs from "../components/whyChooseUs/WhyChooseUs";
import Testimonials from "../components/testimonials/Testimonials";
import EarningsSection from "../components/earnings/EarningsSection";
import Pricing from "../components/pricing/Pricing";
import Coverage from "../components/coverage/Coverage";
import FAQ from "../components/faq/FAQ";
import CTASection from "../components/cta/CTASection";
import Footer from "../components/layout/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <SupportAcrossIndia />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <EarningsSection />
      <Pricing />
      <Coverage />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;
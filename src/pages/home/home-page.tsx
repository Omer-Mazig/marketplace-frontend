import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { PopularProducts } from "./_components/popular-products";
import { Testimonials } from "./_components/testimonials";
import { HowItWorks } from "./_components/how-it-work";
import { CallToAction } from "./_components/call-to-action";

function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <PopularProducts />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
    </>
  );
}

export default HomePage;
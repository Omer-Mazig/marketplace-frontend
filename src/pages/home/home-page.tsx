import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { Testimonials } from "./_components/testimonials";
import { HowItWorks } from "./_components/how-it-work";
import { CallToAction } from "./_components/call-to-action";

// TODO: make a carusel in home page for some elemnts
function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CallToAction />
    </>
  );
}

export default HomePage;

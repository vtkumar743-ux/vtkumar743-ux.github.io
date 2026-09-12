import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import Numbers from "@/sections/Numbers";
import Work from "@/sections/Work";
import Experience from "@/sections/Experience";
import Services from "@/sections/Services";
import Pricing from "@/sections/Pricing";
import Faq from "@/sections/Faq";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Numbers />
      <Work />
      <Experience />
      <Services />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}

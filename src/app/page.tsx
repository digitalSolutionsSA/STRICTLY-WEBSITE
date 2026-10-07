import { HomeHero } from "@/components/sections/home-hero";
import { Pillars } from "@/components/sections/pillars";
import { Story } from "@/components/sections/story";
import { Spotlight } from "@/components/sections/spotlight";
import { Testimonials } from "@/components/sections/testimonials";
import { QuoteBanner } from "@/components/sections/quote-banner";
import { Location } from "@/components/sections/location";
import { Marquee } from "@/components/ui/marquee";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Pillars />
      <div className="wood relative overflow-hidden text-ivory/90 shadow-[inset_0_8px_12px_-6px_rgb(0_0_0/0.5),inset_0_-8px_12px_-6px_rgb(0_0_0/0.5)]">
        <Marquee
          items={["Hand-Crafted Coffee", "Homecooked Meals", "Sharing Platters", "Bubble Tea", "Fresh Bakes", "Where Friends Meet"]}
        />
      </div>
      <Story />
      <Spotlight />
      <Testimonials />
      <QuoteBanner />
      <Location />
    </>
  );
}

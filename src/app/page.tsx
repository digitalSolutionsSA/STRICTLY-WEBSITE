import { Hero } from "@/components/sections/hero";
import { Story } from "@/components/sections/story";
import { Testimonials } from "@/components/sections/testimonials";
import { Location } from "@/components/sections/location";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Testimonials />
      <Location />
    </>
  );
}

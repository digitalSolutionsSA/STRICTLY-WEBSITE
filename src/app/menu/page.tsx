import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Menu } from "@/components/sections/menu";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Marquee } from "@/components/ui/marquee";

export const metadata: Metadata = {
  title: "Menu | Strictly Come Coffee",
  description:
    "The full Strictly Come Coffee menu — traditional and speciality coffee, freezo's, bubble tea, breakfast, lunch, sandwiches and more.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Strictly Come Coffee"
        thin="Our full"
        title="Menu"
        subtitle="Traditional and speciality coffee, freezo's, bubble tea, breakfast, lunch and sweet treats."
        images={["/shop-images/3.jpeg", "/shop-images/5.jpeg", "/shop-images/6.jpeg"]}
      />
      <Menu />
      <div className="wood relative overflow-hidden text-ivory/90 shadow-[inset_0_8px_12px_-6px_rgb(0_0_0/0.5),inset_0_-8px_12px_-6px_rgb(0_0_0/0.5)]">
        <Marquee items={["Cappuccino", "Café Bon Bon", "Strictly Mocha", "Chai Latte", "Freezo's", "Bubble Tea"]} reverse />
      </div>
      <CtaBanner title="Pull up a chair" script="Made to order" image="/shop-images/2.jpeg" />
    </>
  );
}

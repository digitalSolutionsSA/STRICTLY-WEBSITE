import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { HomeCookedMeals } from "@/components/sections/home-cooked-meals";
import { Spotlight } from "@/components/sections/spotlight";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Home Cooked Meals | Strictly Come Coffee",
  description:
    "Pre-order a fresh homecooked meal from Strictly Come Coffee, Monday to Thursday — collection or delivery around Three Rivers and Risiville.",
};

export default function HomeCookedMealsPage() {
  return (
    <>
      <PageHero
        eyebrow="Strictly Come Coffee"
        thin="Weekly meal"
        title="Specials"
        subtitle="A fresh homecooked plate, Monday to Thursday — collect it or have it delivered."
        images={["/shop-images/3.jpeg"]}
      />
      <HomeCookedMeals />
      <Spotlight
        image="/shop-images/1.jpeg"
        heavy="Homemade"
        thin="with love."
        eyebrow="Monday – Thursday · Three Rivers & Risiville"
        copy="Honest, homecooked food — the kind that tastes like Sunday lunch, any day of the week."
      />
      <CtaBanner title="Dinner is sorted" script="Pre-order today" image="/shop-images/2.jpeg" />
    </>
  );
}

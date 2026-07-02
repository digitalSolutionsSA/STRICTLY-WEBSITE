import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { HomeCookedMeals } from "@/components/sections/home-cooked-meals";

export const metadata: Metadata = {
  title: "Home Cooked Meals | Strictly Come Coffee",
  description:
    "Pre-order a fresh homecooked meal from Strictly Come Coffee, Monday to Thursday — collection or delivery around Three Rivers and Risiville.",
};

export default function HomeCookedMealsPage() {
  return (
    <>
      <PageHeader eyebrow="Strictly Come Coffee" title="Weekly Meal Specials" />
      <HomeCookedMeals />
    </>
  );
}

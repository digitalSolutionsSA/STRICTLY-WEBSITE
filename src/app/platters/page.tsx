import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Platters } from "@/components/sections/platters";
import { ZoomReveal } from "@/components/sections/zoom-reveal";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Platters | Strictly Come Coffee",
  description:
    "Generous, shareable platters from Strictly Come Coffee — perfect for groups, family lunches and feeding the whole table.",
};

export default function PlattersPage() {
  return (
    <>
      <PageHero
        eyebrow="Strictly Come Coffee"
        thin="Platters for"
        title="The Table"
        subtitle="Generous, shareable and made fresh — for friends, family and everyone in between."
        images={["/shop-images/6.jpeg"]}
      />
      <Platters />
      <ZoomReveal
        image="/shop-images/1.jpeg"
        left="Pull up"
        right="a chair"
        caption="Brick, timber and pendant lights — there's always room for one more at the table."
      />
      <CtaBanner title="Feeding the whole table" script="Made to share" image="/shop-images/5.jpeg" />
    </>
  );
}

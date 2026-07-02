import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Platters } from "@/components/sections/platters";

export const metadata: Metadata = {
  title: "Platters | Strictly Come Coffee",
  description:
    "Generous, shareable platters from Strictly Come Coffee — perfect for groups, family lunches and feeding the whole table.",
};

export default function PlattersPage() {
  return (
    <>
      <PageHeader eyebrow="Strictly Come Coffee" title="Platters For The Table" />
      <Platters />
    </>
  );
}

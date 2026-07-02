import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Menu } from "@/components/sections/menu";

export const metadata: Metadata = {
  title: "Menu | Strictly Come Coffee",
  description:
    "The full Strictly Come Coffee menu — traditional and speciality coffee, freezo's, bubble tea, breakfast, lunch, sandwiches and more.",
};

export default function MenuPage() {
  return (
    <>
      <PageHeader eyebrow="Strictly Come Coffee" title="Our Full Menu" />
      <Menu />
    </>
  );
}

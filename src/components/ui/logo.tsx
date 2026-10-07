import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Load immediately (navbar, preloader) */
  eager?: boolean;
  /** white on wood/photos, brown ink on parchment (as on the printed menu) */
  tone?: "white" | "black" | "brown";
}

export function Logo({ className, eager, tone = "white" }: LogoProps) {
  return (
    <Image
      src={`/graphics/logo-${tone}.png`}
      alt={`${siteConfig.name} logo`}
      width={1300}
      height={750}
      priority={eager}
      sizes="(max-width: 640px) 160px, 260px"
      className={cn("h-auto", className)}
    />
  );
}

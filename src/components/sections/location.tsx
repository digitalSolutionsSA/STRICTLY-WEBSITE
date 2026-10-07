"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { useSectionReveal } from "@/hooks/use-section-reveal";
import { GoldButton } from "@/components/ui/gold-button";
import { PlankSign, RusticArt, TornEdge } from "@/components/ui/rustic";
import { siteConfig } from "@/lib/site-config";

export function Location() {
  const root = useSectionReveal<HTMLElement>();

  const details = [
    {
      icon: MapPin,
      title: "Address",
      body: <p className="mt-1 text-sm leading-relaxed text-ink-soft">{siteConfig.address}</p>,
    },
    {
      icon: Phone,
      title: "Phone",
      body: (
        <a href={siteConfig.phoneHref} className="mt-1 inline-block text-sm text-ink-soft transition-colors hover:text-rust">
          {siteConfig.phone}
        </a>
      ),
    },
    {
      icon: Clock,
      title: "Opening Hours",
      body: (
        <ul className="mt-2 flex flex-col gap-1">
          {siteConfig.hours.map((h) => (
            <li key={h.day} className="flex items-baseline gap-2 py-1 text-sm text-ink-soft">
              <span>{h.day}</span>
              <span className="leader" />
              <span className="font-poster tracking-wide text-ink">{h.time}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <section ref={root} id="location" className="paper paper-burnt relative py-28 lg:py-36">
      <TornEdge side="top" />
      <RusticArt name="daisies" className="absolute bottom-0 right-[2%] hidden w-52 opacity-85 2xl:block" />

      <div className="container-edge relative grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <div data-sr="fade">
            <PlankSign size="md">Visit Us</PlankSign>
          </div>
          <h2 className="mt-7 text-[clamp(2.6rem,5.6vw,5.2rem)] leading-[0.95]">
            <span className="mask-line script-line">
              <span className="font-script text-[1.15em] text-rust">Come say</span>
            </span>
            <span className="mask-line">
              <span className="type-heavy letterpress-wood">Hello</span>
            </span>
          </h2>
          <span data-rule className="ink-rule mt-7 max-w-[12rem]" />
          <p data-sr="up" className="mt-7 max-w-md font-serif text-lg leading-relaxed text-ink sm:text-xl">
            Find us inside Riversquare Mall in Three Rivers — plenty of parking, easy access, and a warm welcome waiting.
          </p>

          <div data-stagger className="mt-10 flex max-w-md flex-col gap-7">
            {details.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="wood grid h-11 w-11 shrink-0 place-items-center rounded-full shadow-[inset_0_0_0_2px_rgb(30_18_8/0.5)]">
                  <Icon className="h-5 w-5 text-ivory" strokeWidth={1.4} />
                </div>
                <div className="w-full">
                  <h3 className="font-poster text-base font-medium uppercase tracking-[0.12em] text-ink">{title}</h3>
                  {body}
                </div>
              </div>
            ))}
          </div>

          <div data-sr="up" className="mt-10">
            <GoldButton href={siteConfig.mapsHref} external magnetic>
              <MapPin size={15} />
              Get Directions
            </GoldButton>
          </div>
        </div>

        <div data-wipe="up" className="old-photo relative h-[420px] w-full rotate-1 overflow-hidden lg:h-[600px]">
          {/* Sepia-toned so the map reads like an old printed one */}
          <iframe
            title="Strictly Come Coffee location map"
            src="https://maps.google.com/maps?q=Riversquare%20Mall%2C%20Nile%20Drive%2C%20Three%20Rivers%2C%20Gauteng%2C%201935&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full [filter:sepia(0.55)_saturate(0.8)_contrast(0.95)_brightness(0.97)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

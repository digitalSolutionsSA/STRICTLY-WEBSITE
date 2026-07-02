"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { TextReveal } from "@/components/effects/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig } from "@/lib/site-config";

export function Location() {
  return (
    <section id="location" className="relative bg-cream-dim py-28 lg:py-36">
      <div className="container-edge grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-lg italic text-gold-dark"
          >
            Visit Us
          </motion.span>

          <TextReveal
            text="Come Say Hello"
            as="h2"
            className="mt-2 font-display text-4xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-balance text-base leading-relaxed text-roast-light sm:text-lg"
          >
            Find us inside Riversquare Mall in Three Rivers — plenty of parking,
            easy access, and a warm welcome waiting.
          </motion.p>

          <div className="mt-10 flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-beige text-gold-dark">
                <MapPin className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-base font-medium text-espresso">
                  Address
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-roast-light">
                  {siteConfig.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-beige text-gold-dark">
                <Phone className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-base font-medium text-espresso">
                  Phone
                </h3>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-1 inline-block text-sm leading-relaxed text-roast-light transition-colors hover:text-gold-dark"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-beige text-gold-dark">
                <Clock className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div className="w-full">
                <h3 className="font-display text-base font-medium text-espresso">
                  Opening Hours
                </h3>
                <ul className="mt-2 flex flex-col gap-1">
                  {siteConfig.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex justify-between border-b border-beige-dark/30 py-1.5 text-sm text-roast-light last:border-none"
                    >
                      <span>{h.day}</span>
                      <span className="font-medium text-espresso">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <MagneticButton
              href={siteConfig.mapsHref}
              className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ember-dark"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.5} />
              Get Directions
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-[420px] w-full overflow-hidden rounded-lg shadow-2xl shadow-espresso/15 lg:h-[600px]"
        >
          <iframe
            title="Strictly Come Coffee location map"
            src="https://maps.google.com/maps?q=Riversquare%20Mall%2C%20Nile%20Drive%2C%20Three%20Rivers%2C%20Gauteng%2C%201935&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}

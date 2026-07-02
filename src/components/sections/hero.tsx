"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Coffee, MapPin } from "lucide-react";
import { TextReveal } from "@/components/effects/text-reveal";
import { Steam } from "@/components/effects/steam";
import { BeanIcon } from "@/components/effects/intro-loader";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig, stats } from "@/lib/site-config";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background drifts slower than scroll, content fades + lifts
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex h-[100svh] min-h-[720px] w-full items-center justify-center overflow-hidden bg-espresso grain"
    >
      {/* Background video with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[10%] h-[120%] w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-[68%_center] sm:object-center"
          poster="/shop-images/1.jpeg"
        >
          <source src="/graphics/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Readability overlay: dark on the left for text, clear on the right for the video */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/50 to-espresso/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/10 to-transparent" />

      {/* Floating decorative beans */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[6%] top-[22%] hidden opacity-20 sm:block"
      >
        <BeanIcon className="h-16 w-16 text-gold-light" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 16, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[8%] top-[16%] hidden opacity-20 sm:block"
      >
        <BeanIcon className="h-10 w-10 text-ember-light" />
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="pointer-events-none absolute bottom-[16%] right-[14%] hidden opacity-15 sm:block"
      >
        <BeanIcon className="h-12 w-12 text-gold" />
      </motion.div>

      {/* Floating steam */}
      <Steam className="pointer-events-none absolute bottom-[24%] left-1/2 h-64 w-32 -translate-x-1/2" count={4} />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-edge relative z-10 flex flex-col items-start pt-32 text-left"
      >
        <h1 className="font-poster text-[13vw] uppercase leading-[0.88] tracking-tight text-cream sm:text-[11vw] lg:text-[6.5vw]">
          <TextReveal text="Where" as="span" animateOnMount className="justify-start" />
          <TextReveal text="Friends" as="span" animateOnMount delay={0.15} className="justify-start" />
          <TextReveal
            text="Meet"
            as="span"
            animateOnMount
            delay={0.3}
            className="justify-start text-ember-light"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 max-w-xl text-balance text-base font-light leading-relaxed text-cream/70 sm:text-lg"
        >
          Hand-crafted coffee, homecooked meals &amp; sharing platters in the heart
          of Three Rivers —{" "}
          <span className="font-display italic text-gold-light">{siteConfig.name}</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 flex flex-wrap items-center justify-start gap-4"
        >
          <MagneticButton
            href="#menu"
            className="bg-ember text-cream hover:bg-ember-dark"
          >
            <Coffee className="h-4 w-4" />
            View Menu
          </MagneticButton>
          <MagneticButton
            href="#location"
            className="border border-cream/30 bg-cream/5 text-cream hover:bg-cream hover:text-espresso"
          >
            <MapPin className="h-4 w-4" />
            Visit Us
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-14 flex flex-wrap items-center justify-start gap-3"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex items-center gap-2 rounded-full border border-gold/20 bg-cream/5 px-5 py-3 backdrop-blur-sm"
            >
              <span
                className={
                  i % 2 === 0
                    ? "font-display text-lg font-semibold text-ember-light"
                    : "font-display text-lg font-semibold text-gold"
                }
              >
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-cream/60">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-cream/50"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

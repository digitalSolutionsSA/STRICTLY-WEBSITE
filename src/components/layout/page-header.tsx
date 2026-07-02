"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/effects/text-reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[42vh] w-full items-center justify-center overflow-hidden bg-espresso grain pt-32">
      <div className="container-edge relative z-10 flex flex-col items-center py-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-lg italic text-gold-light"
        >
          {eyebrow}
        </motion.span>

        <TextReveal
          text={title}
          as="h1"
          animateOnMount
          delay={0.15}
          className="mt-2 justify-center font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-xl text-balance text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}

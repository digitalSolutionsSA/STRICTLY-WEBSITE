"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { TextReveal } from "@/components/effects/text-reveal";
import { menuCategories, MenuItem } from "@/lib/menu-data";
import { cn } from "@/lib/utils";

export function Menu() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem>(menuCategories[0].items[0]);

  const active = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0];

  function handleCategoryChange(id: string) {
    setActiveId(id);
    const cat = menuCategories.find((c) => c.id === id);
    if (cat?.items[0]) setSelectedItem(cat.items[0]);
  }

  return (
    <section id="menu" className="relative bg-cream-dim py-28 lg:py-36">
      <div className="container-edge">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-lg italic text-gold-dark"
          >
            The Menu
          </motion.span>

          <TextReveal
            text="Something For Everyone"
            as="h2"
            className="mt-2 font-display text-4xl font-medium leading-[1.05] tracking-tight text-espresso sm:text-5xl lg:text-6xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-roast-light sm:text-lg"
          >
            From traditional coffee to homecooked platters, bubble tea and little
            beans for the kids — explore our full menu below.
          </motion.p>
        </div>

        {/* Category filter pills */}
        <div className="-mx-6 mt-12 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeId === cat.id
                  ? "text-cream"
                  : "text-roast-light hover:text-espresso"
              )}
            >
              {activeId === cat.id && (
                <motion.span
                  layoutId="menu-pill"
                  className="absolute inset-0 rounded-full bg-espresso"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Two-column layout: item list left, image panel right */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10"
            >
              {/* Item list */}
              <ul className="flex flex-col gap-1 lg:w-1/2">
                {active.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                  >
                    <button
                      onClick={() => setSelectedItem(item)}
                      className={cn(
                        "group w-full rounded-lg border px-5 py-4 text-left transition-all",
                        selectedItem.name === item.name
                          ? "border-gold/60 bg-cream shadow-md shadow-roast/5"
                          : "border-beige-dark/40 bg-cream hover:-translate-x-0.5 hover:border-gold/30 hover:shadow-sm"
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-base font-medium transition-colors",
                          selectedItem.name === item.name
                            ? "text-gold-dark"
                            : "text-espresso group-hover:text-gold-dark"
                        )}
                      >
                        {item.name}
                      </span>
                      {item.description && (
                        <p className="mt-1 text-sm leading-relaxed text-roast-light">
                          {item.description}
                        </p>
                      )}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Image / detail panel */}
              <div className="lg:sticky lg:top-28 lg:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedItem.name}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden rounded-2xl border border-beige-dark/40 bg-cream shadow-lg shadow-roast/5"
                  >
                    {selectedItem.image ? (
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={selectedItem.image}
                          alt={selectedItem.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#f0ebe3]">
                        <div className="text-center px-8">
                          <svg
                            className="mx-auto mb-4 h-14 w-14 text-gold/40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                          >
                            <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                            <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                            <line x1="6" y1="2" x2="6" y2="4" />
                            <line x1="10" y1="2" x2="10" y2="4" />
                            <line x1="14" y1="2" x2="14" y2="4" />
                          </svg>
                          <p className="font-display text-sm italic text-roast-light/60">
                            Photo coming soon
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <p className="text-xs font-medium uppercase tracking-widest text-gold-dark">
                        {active.title}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-medium text-espresso">
                        {selectedItem.name}
                      </h3>
                      {selectedItem.description && (
                        <p className="mt-2 text-sm leading-relaxed text-roast-light">
                          {selectedItem.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

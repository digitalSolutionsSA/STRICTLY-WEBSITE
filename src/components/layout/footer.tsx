"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { siteConfig, navLinks } from "@/lib/site-config";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-espresso grain text-cream">
      <div className="container-edge grid gap-16 py-20 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12 lg:py-24">
        {/* Brand + newsletter */}
        <div>
          <span className="font-display text-2xl italic text-gold-light">
            {siteConfig.name}
          </span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/55">
            {siteConfig.motto} — coffee, homecooked food and good company in
            Riversquare Mall, Three Rivers.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 max-w-sm">
            <label className="text-xs uppercase tracking-[0.2em] text-cream/40">
              Join our newsletter
            </label>
            <div className="mt-3 flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.03] p-1.5 transition-colors focus-within:border-gold/40">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-transparent px-4 py-2 text-sm text-cream placeholder:text-cream/30 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-espresso transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={
                submitted ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }
              }
              className="mt-2 text-xs text-gold-light"
            >
              Thanks for subscribing — see you soon!
            </motion.p>
          </form>
        </div>

        {/* Nav links */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-cream/40">
            Explore
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center text-sm text-cream/70 transition-colors hover:text-gold-light"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-gold-light transition-all duration-300 group-hover:w-full" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-cream/40">
            Get In Touch
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-cream/70">
            <a href={siteConfig.phoneHref} className="transition-colors hover:text-gold-light">
              {siteConfig.phone}
            </a>
            <p className="max-w-xs leading-relaxed">{siteConfig.address}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <MagneticButton
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/40 hover:text-gold-light"
            >
              <InstagramIcon className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold/40 hover:text-gold-light"
            >
              <FacebookIcon className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-edge flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/40 sm:flex-row">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>{siteConfig.motto}</span>
        </div>
      </div>
    </footer>
  );
}

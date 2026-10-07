"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/icons/social-icons";
import { Logo } from "@/components/ui/logo";
import { GinghamStrip } from "@/components/ui/rustic";
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
    <footer className="wood-dark relative overflow-hidden">
      <GinghamStrip className="relative z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgb(205 168 106 / 0.35), transparent)" }}
      />

      <div className="container-edge relative grid gap-12 pt-20 pb-14 md:grid-cols-2">
        {/* Visit */}
        <div>
          <h3 className="type-heavy text-gold-leaf text-2xl">Come say hello</h3>
          <p className="mt-3 max-w-sm text-sm text-mist">
            {siteConfig.motto} — coffee, homecooked food and good company in Riversquare Mall, Three Rivers.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <a href={siteConfig.phoneHref} className="flex items-center gap-3 text-ivory/75 hover:text-ivory">
                <Phone size={15} className="text-gold" /> {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-ivory/75 hover:text-ivory"
              >
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {siteConfig.address}
                  <span className="ml-2 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gold">
                    Directions <ArrowUpRight size={11} />
                  </span>
                </span>
              </a>
            </li>
            {siteConfig.hours.map((h, i) => (
              <li key={h.day} className="flex items-center gap-3 text-ivory/75">
                <Clock size={15} className={i === 0 ? "text-gold" : "invisible"} />
                <span className="w-36">{h.day}</span>
                <span className="text-ivory">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + social */}
        <div>
          <h3 className="type-heavy text-gold-leaf text-2xl">Join our newsletter</h3>
          <p className="mt-3 max-w-sm text-sm text-mist">New bakes, weekly meal specials and the odd treat for regulars.</p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex max-w-md overflow-hidden rounded-full border border-gold/40 bg-night/60 focus-within:border-gold"
          >
            <label htmlFor="footer-email" className="sr-only">
              Your email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              autoComplete="email"
              className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-ivory outline-none placeholder:text-mist/70"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid w-14 place-items-center bg-[linear-gradient(115deg,#f6e3b0_0%,#d9b45c_35%,#a9803f_70%,#e6cc9f_100%)] text-night transition-[filter] hover:brightness-110"
            >
              <ArrowRight size={18} />
            </button>
          </form>
          {submitted && <p className="mt-3 text-xs text-gold-light">Thanks for subscribing — see you soon!</p>}

          <div className="mt-8 flex gap-3">
            {[
              { label: "Instagram", Icon: InstagramIcon },
              { label: "Facebook", Icon: FacebookIcon },
            ].map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-ivory/70 transition-colors hover:border-gold hover:bg-gold/10 hover:text-gold-light"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Logo + nav */}
      <div className="container-edge relative pb-12 text-center">
        <span className="gold-rule mb-12" />
        <Logo className="mx-auto w-48" />
        <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Footer">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-ivory/70 transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-[0.62rem] uppercase tracking-[0.5em] text-mist">Coffee · Good food · Where friends meet</p>
        <p className="mt-8 text-xs text-ivory/40">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

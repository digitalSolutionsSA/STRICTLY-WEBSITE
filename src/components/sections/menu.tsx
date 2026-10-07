"use client";

import { useSectionReveal } from "@/hooks/use-section-reveal";
import { PlankSign, TornEdge } from "@/components/ui/rustic";
import { menuCategories, type MenuCategory, type MenuItem } from "@/lib/menu-data";

const groups = [
  { id: "drinks", title: "Drinks", script: "Something to sip" },
  { id: "food", title: "Food", script: "From our kitchen" },
] as const;

const price = (n?: number) => (n == null ? "" : `R${n}`);

/** The full menu set like the printed one: plank-sign headings, dotted leaders, Regular / Large prices. */
export function Menu() {
  const root = useSectionReveal<HTMLElement>();

  return (
    <section ref={root} id="menu" className="paper paper-burnt relative py-24 lg:py-32">
      <TornEdge side="top" />
      <TornEdge side="bottom" />
      <div className="container-edge">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="font-script text-[clamp(3rem,5.4vw,5.2rem)] leading-none text-wood">
            <span className="mask-line script-line">
              <span>Where Friends Meet</span>
            </span>
          </h2>
          <span data-rule className="mx-auto mt-6 block h-px max-w-xs bg-ink/30" />
          <p data-sr="up" className="mx-auto mt-6 max-w-xl font-serif text-lg leading-relaxed text-ink-soft sm:text-xl">
            Hand-crafted coffee, hearty breakfasts, homecooked lunches and something sweet — straight from our menu board.
          </p>

          {/* Jump links to each category */}
          <nav data-sr="up" aria-label="Menu categories" className="mt-10 flex flex-wrap justify-center gap-x-1 gap-y-2">
            {menuCategories.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="font-poster text-[0.8rem] uppercase tracking-[0.12em] text-ink-soft transition-colors hover:text-rust"
              >
                {c.title}
                {i < menuCategories.length - 1 && <span className="mx-2 text-rust/50">✦</span>}
              </a>
            ))}
          </nav>
        </header>

        {groups.map((g) => (
          <div key={g.id} className="mt-24 first-of-type:mt-20">
            <div className="mb-14 flex flex-col items-center gap-3 text-center">
              <p data-sr="fade" className="font-script text-4xl text-rust sm:text-5xl">
                {g.script}
              </p>
              <div data-sr="zoom">
                <PlankSign as="h3" size="lg">
                  {g.title}
                </PlankSign>
              </div>
            </div>

            <div className="columns-1 gap-14 md:columns-2 xl:columns-3">
              {menuCategories
                .filter((c) => c.group === g.id)
                .map((c) => (
                  <Category key={c.id} category={c} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Category({ category: c }: { category: MenuCategory }) {
  return (
    <article id={c.id} data-sr="up" className="mb-16 scroll-mt-28 break-inside-avoid">
      <div className="mb-5 text-center">
        <PlankSign as="h4" size="md">
          {c.title}
        </PlankSign>
        {c.note && <p className="mt-4 font-poster text-[0.78rem] uppercase tracking-[0.1em] text-ink-soft">{c.note}</p>}
      </div>

      {c.sized && (
        <div className="mb-1 flex justify-end gap-0 font-poster text-[0.8rem] uppercase tracking-wide text-ink-soft">
          <span className="w-16 text-right">Regular</span>
          <span className="w-16 text-right">Large</span>
        </div>
      )}

      {c.compact ? (
        <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
          {c.items.map((item) => (
            <li key={item.name} className="flex items-baseline gap-2 font-poster text-[0.95rem] uppercase tracking-[0.03em] text-ink">
              <span>{item.name}</span>
              {item.price != null && (
                <>
                  <span className="leader" />
                  <span className="text-rust">{price(item.price)}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3.5">
          {c.items.map((item) => (
            <Row key={item.name} item={item} sized={c.sized} />
          ))}
        </ul>
      )}
    </article>
  );
}

function Row({ item, sized }: { item: MenuItem; sized?: boolean }) {
  return (
    <li>
      <div className="flex items-baseline gap-2 font-poster uppercase text-ink">
        <span className="text-[1.02rem] font-medium tracking-[0.02em]">{item.name}</span>
        <span className="leader" />
        {sized ? (
          <>
            <span className="w-14 shrink-0 text-right text-rust">{price(item.price)}</span>
            <span className="w-14 shrink-0 text-right text-rust">{price(item.large)}</span>
          </>
        ) : (
          <span className="shrink-0 text-rust">{price(item.price)}</span>
        )}
      </div>
      {item.description && <p className="mt-0.5 max-w-[34ch] font-serif text-[0.88rem] italic leading-snug text-ink-soft">{item.description}</p>}
    </li>
  );
}

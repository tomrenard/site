import type { ReactNode } from "react";

// A page row: full-width rule, label in the left third, body in the right two thirds.
export function Section({
  title,
  aside,
  children,
}: {
  title?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  const label = title ? (
    <h2 className="section-label col-span-4 mb-6 lg:mb-0 text-lg leading-7 font-medium tracking-[-0.01em] text-balance">
      {title}
    </h2>
  ) : aside ? (
    <div className="section-label col-span-4 mb-6 lg:mb-0 text-lg leading-7 font-medium tracking-[-0.01em]">
      <div>{aside}</div>
    </div>
  ) : null;

  return (
    <section className="section grid-page">
      {label}
      <div className="section-body col-span-4 max-w-[40rem] lg:col-span-7 lg:col-start-5">
        {children}
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-6 lg:px-10">{item}</span>
          <span className="size-[0.25em] bg-accent" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden className="border-t border-rule">
      <div className="marquee -mx-4 py-8 text-5xl leading-none font-medium tracking-[-0.04em] sm:-mx-6 md:-mx-10 lg:py-12 lg:text-8xl">
        {row}
        {row}
      </div>
    </div>
  );
}

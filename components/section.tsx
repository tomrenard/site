import type { ReactNode } from "react";
import { CountUp } from "@/components/motion";

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
      <span>{title}</span>
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
      <div className="marquee -mx-(--gutter) py-12 text-5xl leading-none font-medium tracking-[-0.04em] lg:py-18 lg:text-8xl">
        {row}
        {row}
      </div>
    </div>
  );
}

// Big numbers that count up as they scroll into view; the real value stays for screen readers.
export function Stats({ items }: { items: { value: number; label: string }[] }) {
  return (
    <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10">
      {items.map((s) => (
        <div key={s.label} className="border-t border-faint pt-4">
          <dt className="sr-only">{s.label}</dt>
          <dd className="text-6xl leading-none font-medium tracking-[-0.04em] tabular-nums lg:text-7xl">
            <CountUp value={s.value} />
          </dd>
          <dd aria-hidden className="mt-3 text-sm leading-5 text-mute">
            {s.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// A large line whose words fill from grey to ink, one after another, as it scrolls through.
export function Statement({ children }: { children: string }) {
  const words = children.split(" ");
  return (
    <section className="section">
    <p className="statement text-4xl leading-[1.05] font-medium tracking-[-0.035em] text-balance lg:text-7xl">
      {words.map((w, i) => (
        <span key={i}>
          <span style={{ "--i": i, "--n": words.length } as React.CSSProperties}>
            {w}
          </span>{" "}
        </span>
      ))}
    </p>
    </section>
  );
}

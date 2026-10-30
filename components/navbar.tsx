"use client";

import cn from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "/", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/craft", label: "Craft" },
  { href: "/projects", label: "Projects" },
];

function Item({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li className="flex items-center">
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "inline-flex items-center gap-1.5 transition-colors",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink",
          isActive ? "text-ink" : "text-mute hover:text-ink"
        )}
        draggable={false}
      >
        {isActive && <span aria-hidden className="size-2 bg-accent" />}
        <Roll>{label}</Roll>
      </Link>
    </li>
  );
}

// Text slides up and a copy rolls in from below on hover.
function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span data-text={children}>{children}</span>
    </span>
  );
}

export default function Navbar() {
  return (
    <header className="site-header sticky top-0 z-30 bg-paper pt-3 text-sm">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 pb-2 lg:grid-cols-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-medium"
          draggable={false}
        >
          <span aria-hidden className="logo-square size-2.5 bg-ink" />
          <Roll>Tom Renard</Roll>
        </Link>
        <nav className="col-span-2 row-start-2 lg:col-span-1 lg:row-start-auto">
          <ul className="flex gap-4">
            {links.map((l) => (
              <Item key={l.href} {...l} />
            ))}
          </ul>
        </nav>
        <p className="hidden text-mute lg:block">
          Senior Product Engineer [Berlin]
        </p>
        <p className="text-right text-mute">©{new Date().getFullYear()}</p>
      </div>
      <div className="header-rule h-px bg-rule" />
    </header>
  );
}

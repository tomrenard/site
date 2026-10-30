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
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <li className="flex items-center">
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "inline-flex items-center gap-2 transition-colors",
          "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink",
          isActive ? "text-ink" : "text-mute hover:text-ink",
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
    <header className="sticky top-0 z-30 bg-paper text-sm leading-5">
      <div className="grid-page gap-y-2 py-3">
        <Link
          href="/"
          className="header-item col-span-2 flex items-center gap-2 font-medium lg:col-span-4"
          draggable={false}
        >
          <span aria-hidden className="logo-square size-2.5 bg-ink" />
          <Roll>Tom Renard</Roll>
        </Link>
        <nav className="header-item col-span-4 row-start-2 lg:row-start-auto">
          <ul className="flex gap-4">
            {links.map((l) => (
              <Item key={l.href} {...l} />
            ))}
          </ul>
        </nav>
        <p className="header-item hidden text-mute lg:col-span-3 lg:block">
          Senior Product Engineer [Berlin]
        </p>
        <p className="header-item col-span-2 col-start-3 text-right text-mute lg:col-span-1 lg:col-start-auto">
          ©{new Date().getFullYear()}
        </p>
      </div>
      <div className="relative h-px">
        <div className="header-rule absolute inset-0 bg-rule" />
        <div className="scroll-progress absolute inset-x-0 -top-px h-[3px] bg-accent" />
      </div>
    </header>
  );
}

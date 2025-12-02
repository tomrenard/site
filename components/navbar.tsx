"use client";

import cn from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Item(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const href = props.href;

  if (typeof href !== "string") {
    throw new Error("`href` must be a string");
  }

  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <li
      className={cn(
        isActive
          ? "text-neutral-900"
          : "text-neutral-400 hover:text-neutral-700",
        "transition-colors hover:transform-none",
        "-mx-2"
      )}
    >
      <Link
        {...props}
        className="inline-block w-full px-2 focus-visible:outline focus-visible:outline-neutral-400
        focus-visible:rounded-xs 
        focus-visible:outline-dotted
        focus-visible:text-neutral-600"
        draggable={false}
      />
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="w-full mb-4">
      <ul className="lowercase text-center flex gap-2 justify-center">
        <Item href="/">About</Item>
        <Item href="/projects">Projects</Item>
      </ul>
    </nav>
  );
}

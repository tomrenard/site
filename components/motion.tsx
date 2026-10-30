"use client";

import { useEffect, useRef, useState } from "react";

// Hover text that shuffles its own letters, settling left to right. Shuffling the same
// letters keeps the line the same width, so neighbours and icons never move or get touched.
export function Scramble({ children }: { children: string }) {
  const [shown, setShown] = useState(children);
  const timer = useRef<number>(undefined);

  const run = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      const settled = Math.floor(frame / 2);
      const tail = [...children.slice(settled)];
      const letters = tail
        .filter((ch) => ch !== " ")
        .sort(() => Math.random() - 0.5);
      setShown(
        children.slice(0, settled) +
          tail.map((ch) => (ch === " " ? ch : letters.pop())).join(""),
      );
      if (settled >= children.length) clearInterval(timer.current);
      frame++;
    }, 30);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <span className="scramble" onPointerEnter={run} onFocus={run}>
      <span className="invisible">{children}</span>
      <span
        aria-hidden
        className="absolute inset-0 overflow-clip whitespace-nowrap"
      >
        {shown}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

// Accent square that trails the mouse and opens into a label over links. Mouse only.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (
      !matchMedia("(pointer: fine)").matches ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const el = dot.current!;
    let x = -100,
      y = -100,
      tx = -100,
      ty = -100,
      raf = 0;
    let magnet: HTMLElement | null = null;

    const tick = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.translate = `${x}px ${y}px`;
      raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.dataset.visible = "true";
      // Magnetic pull: the hovered link moves a quarter of the way toward the pointer.
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        magnet.style.translate = `${(tx - r.left - r.width / 2) * 0.25}px ${(ty - r.top - r.height / 2) * 0.25}px`;
      }
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "a, button",
      );
      if (magnet && magnet !== target) magnet.style.translate = "";
      magnet = target?.matches("[data-magnetic]") ? target : null;
      setLabel(
        !target
          ? ""
          : (target.dataset.cursor ??
              (target.hasAttribute("download")
                ? "Download"
                : target.getAttribute("target") === "_blank"
                  ? "Visit"
                  : "Open")),
      );
    };

    const leave = () => (el.dataset.visible = "false");

    raf = requestAnimationFrame(tick);
    addEventListener("pointermove", move);
    addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      data-visible="false"
      data-label={label ? "true" : "false"}
      className="cursor pointer-events-none fixed top-0 left-0 z-50"
    >
      <span>{label}</span>
    </div>
  );
}

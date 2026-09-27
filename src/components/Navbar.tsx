"use client";

import { useEffect, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-2.5" aria-label="Suneeta E Mobility home">
      <span className="bg-volt grid h-10 w-10 place-items-center rounded-xl shadow-lg shadow-sky-brand/30">
        <Zap className="h-5 w-5 fill-white text-white" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-lg font-bold ${light ? "text-white" : "text-navy"}`}>Suneeta</span>
        <span className="block text-[11px] font-semibold tracking-[0.25em] text-sky-brand uppercase">E Mobility</span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/85 shadow-sm shadow-sky-brand/10 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-navy/80 transition hover:bg-sky-soft hover:text-sky-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="bg-volt hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-brand/30 transition hover:scale-105 hover:shadow-sky-brand/50 lg:inline-flex"
        >
          Book Test Ride
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="grid h-11 w-11 place-items-center rounded-xl text-navy hover:bg-sky-soft lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[520px]" : "max-h-0"}`}
      >
        <ul className="space-y-1 border-t border-sky-soft px-4 pt-3 pb-6">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-navy hover:bg-sky-soft hover:text-sky-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-volt block rounded-xl px-4 py-3 text-center font-semibold text-white"
            >
              Book Test Ride
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

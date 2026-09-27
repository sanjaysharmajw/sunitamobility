import { Mail, MapPin, Phone } from "lucide-react";
import { MODELS, NAV_LINKS } from "@/lib/data";
import { Logo } from "./Navbar";

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
  },
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.2 2.2h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9.1L.9 2.2h7l4.8 6.4 5.5-6.4zm-1.2 18h1.9L7.1 4.1H5.1l11.9 16.1z",
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 pb-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed">
              Making India&apos;s roads cleaner, one electric ride at a time. Smart, stylish and affordable EVs for everyone.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-slate-300 transition hover:bg-sky-brand hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold !text-white">Quick links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-sky-light">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold !text-white">Models</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {MODELS.map((m) => (
                <li key={m.name}>
                  <a href="#models" className="transition hover:text-sky-light">
                    {m.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold !text-white">Get in touch</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-sky-brand" /> Shop no 318, Gafoor Khan Compound, Lal Bahadur Shastri Marg, Ambedkar Nagar, Kurla West, Kurla, Mumbai, Maharashtra 400070
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 shrink-0 text-sky-brand" />
                <span className="flex flex-col gap-1">
                  <a href="tel:+919867460025" className="transition hover:text-sky-light">
                    +91 98674 60025
                  </a>
                  <a href="tel:+919076123054" className="transition hover:text-sky-light">
                    +91 90761 23054
                  </a>
                </span>
              </li>
              <li className="flex gap-3 break-all">
                <Mail className="h-5 w-5 shrink-0 text-sky-brand" /> suneetaenterprise@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} Suneeta E Mobility. All rights reserved.</p>
          <p>
            Designed with <span className="text-sky-light">⚡</span> for a greener India
          </p>
        </div>
      </div>
    </footer>
  );
}

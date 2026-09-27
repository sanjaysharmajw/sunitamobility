"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

const INFO = [
  { icon: Phone, label: "Call us", value: "+91 98674 60025", href: "tel:+919867460025" },
  { icon: Phone, label: "Alternate number", value: "+91 90761 23054", href: "tel:+919076123054" },
  { icon: Mail, label: "Email", value: "suneetaenterprise@gmail.com", href: "mailto:suneetaenterprise@gmail.com" },
  { icon: MapPin, label: "Showroom", value: "Shop no 318, Gafoor Khan Compound, Lal Bahadur Shastri Marg, Ambedkar Nagar, Kurla West, Kurla, Mumbai, Maharashtra 400070", href: "https://www.google.com/maps/search/?api=1&query=Shop%20no%20318%2C%20Gafoor%20Khan%20Compound%2C%20Lal%20Bahadur%20Shastri%20Marg%2C%20Ambedkar%20Nagar%2C%20Kurla%20West%2C%20Kurla%2C%20Mumbai%2C%20Maharashtra%20400070" },
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-navy placeholder:text-slate-400 outline-none transition focus:border-sky-brand focus:bg-white focus:ring-4 focus:ring-sky-brand/15";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      form.reset();
      setStatus({ type: "success", message: "Thank you! Our team will contact you shortly." });
    } catch (err) {
      setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong" });
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact us"
          title="Book your"
          highlight="test ride"
          text="Fill in the form and our team will get in touch within 24 hours."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="bg-volt relative overflow-hidden rounded-3xl p-8 text-white lg:col-span-2 sm:p-10">
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/15 blur-2xl" />
            <h3 className="text-2xl font-bold !text-white">Let&apos;s talk electric</h3>
            <p className="mt-2 text-white/85">Visit our showroom or give us a call. We'll help you choose the right EV.</p>
            <ul className="relative mt-10 space-y-6">
              {INFO.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/20">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-white/75">{label}</span>
                      <span className="block font-semibold break-words">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="relative mt-10 rounded-2xl bg-white/15 p-4 text-sm">
              <b>Showroom timings:</b> Mon to Sun, 10:00 AM to 8:00 PM
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-white p-6 shadow-2xl shadow-sky-brand/10 ring-1 ring-sky-brand/10 sm:p-10 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                  Full name *
                </label>
                <input id="name" name="name" required maxLength={100} placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  pattern="[0-9+\-\s]{10,15}"
                  placeholder="+91 98765 43210"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
                  Email *
                </label>
                <input id="email" name="email" type="email" required maxLength={150} placeholder="you@example.com" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  placeholder="Test ride, price, dealership or any other question…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              {/* honeypot: hidden from humans, bots fill it */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            </div>

            <button
              type="submit"
              disabled={status.type === "loading"}
              className="bg-volt mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-xl shadow-sky-brand/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {status.type === "loading" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" /> Send Message
                </>
              )}
            </button>

            {status.type === "success" && (
              <p role="status" className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-5 w-5 shrink-0" /> {status.message}
              </p>
            )}
            {status.type === "error" && (
              <p role="alert" className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

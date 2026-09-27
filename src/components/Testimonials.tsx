import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-b from-white to-sky-soft/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Happy riders" title="Loved by" highlight="10,000+ riders" />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="relative h-full rounded-3xl bg-white p-7 shadow-lg shadow-sky-brand/5 ring-1 ring-sky-brand/10">
                <Quote className="absolute top-6 right-6 h-10 w-10 text-sky-soft" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 leading-relaxed">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="bg-volt grid h-11 w-11 place-items-center rounded-full font-display font-bold text-white">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{t.name}</span>
                    <span className="text-xs">
                      {t.city} · {t.model}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

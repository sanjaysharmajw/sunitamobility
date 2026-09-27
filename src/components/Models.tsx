import Image from "next/image";
import { ArrowRight, BatteryFull, Clock, Gauge, Route } from "lucide-react";
import { MODELS, type BikeModel } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

function Specs({ m, large = false }: { m: BikeModel; large?: boolean }) {
  const items = [
    { icon: Route, value: `${m.range} km`, label: "Range" },
    { icon: Gauge, value: m.topSpeed && `${m.topSpeed} km/h`, label: "Top speed" },
    { icon: BatteryFull, value: m.battery, label: "Battery" },
    { icon: Clock, value: m.charge, label: "Charge time" },
  ].filter((item) => item.value);
  return (
    <ul className={`grid gap-3 ${items.length === 3 ? "grid-cols-3" : "grid-cols-2"} ${large && items.length === 4 ? "sm:grid-cols-4 md:grid-cols-2" : ""}`}>
      {items.map(({ icon: Icon, value, label }) => (
        <li
          key={label}
          className={`rounded-2xl ${large ? "bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur" : "bg-sky-soft/70 px-3 py-2.5"}`}
        >
          <span className={`flex items-center gap-2 text-xs ${large ? "text-slate-300" : ""}`}>
            <Icon className={`h-4 w-4 shrink-0 ${large ? "text-cyan-volt" : "text-sky-brand"}`} />
            {label}
          </span>
          <b className={`mt-1 block font-display ${large ? "text-xl text-white" : "text-base text-navy"}`}>{value}</b>
        </li>
      ))}
    </ul>
  );
}

function EnquireButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#contact"
      className={`bg-volt group/btn inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-brand/30 transition hover:scale-[1.03] ${className}`}
    >
      Enquire Now
      <ArrowRight className="h-4 w-4 transition group-hover/btn:translate-x-1" />
    </a>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="bg-volt absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md">
      {children}
    </span>
  );
}

function ModelCard({ m }: { m: BikeModel }) {
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-sky-brand/5 ring-1 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-brand/20 ${
        m.badge ? "ring-2 ring-sky-brand" : "ring-sky-brand/10"
      }`}
    >
      {m.badge && <Badge>{m.badge}</Badge>}
      <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(ellipse_at_center,_#ffffff_40%,_#e0f2fe_100%)]">
        <Image
          src={m.image}
          alt={`${m.name} electric scooter`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-6 mix-blend-multiply transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-2xl font-bold">{m.name}</h3>
        <p className="mt-1 text-sm">{m.tagline}</p>
        <div className="mt-5">
          <Specs m={m} />
        </div>
        <div className="mt-auto pt-6">
          <EnquireButton className="w-full" />
        </div>
      </div>
    </article>
  );
}

function FeaturedCard({ m }: { m: BikeModel }) {
  return (
    <article className="group relative grid overflow-hidden rounded-3xl bg-navy shadow-2xl shadow-sky-brand/20 ring-2 ring-sky-brand md:grid-cols-2">
      {m.badge && <Badge>{m.badge}</Badge>}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-200 md:aspect-auto md:min-h-[580px]">
        <Image
          src={m.image}
          alt={`${m.name} electric sports bike`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-[center_60%] transition duration-700 group-hover:scale-105"
        />
      </div>

      <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-14">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-sky-brand/30 blur-3xl" />
        <div className="relative">
          <span className="text-xs font-semibold tracking-[0.25em] text-sky-light uppercase">Performance series</span>
          <h3 className="mt-3 text-3xl font-bold !text-white sm:text-4xl">{m.name}</h3>
          <p className="mt-3 text-slate-300">{m.tagline}. Sporty looks, a powerful motor and long range make every ride a thrill.</p>
          <div className="mt-8">
            <Specs m={m} large />
          </div>
          <EnquireButton className="mt-8 w-full sm:w-auto" />
        </div>
      </div>
    </article>
  );
}

export default function Models() {
  const regular = MODELS.filter((m) => !m.featured);
  const featured = MODELS.filter((m) => m.featured);

  return (
    <section id="models" className="relative bg-gradient-to-b from-white via-sky-soft/60 to-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our line-up"
          title="Choose your"
          highlight="electric ride"
          text="Whether it's a city commute or a long ride, there's a Suneeta for every need."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {regular.map((m, i) => (
            <Reveal key={m.name} delay={i * 120}>
              <ModelCard m={m} />
            </Reveal>
          ))}
        </div>

        {featured.map((m) => (
          <Reveal key={m.name} className="mt-6 lg:mt-8">
            <FeaturedCard m={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

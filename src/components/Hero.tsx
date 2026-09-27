import { ArrowRight, BatteryCharging, Leaf, Play, ShieldCheck } from "lucide-react";
import EVBike from "./EVBike";

const STATS = [
  { icon: BatteryCharging, value: "198 km", label: "Range per charge" },
  { icon: ShieldCheck, value: "3 Yr", label: "Battery warranty" },
  { icon: Leaf, value: "0%", label: "Emission" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-sky-soft via-white to-white pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-sky-light/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[380px] w-[380px] rounded-full bg-cyan-volt/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-sky-brand shadow-md shadow-sky-brand/10 sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-volt opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-brand" />
            </span>
            <span>
              New 2026 range launched<span className="hidden sm:inline">. Book your test ride now</span>
            </span>
          </span>

          <h1 className="mt-6 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Ride the Future.
            <br />
            <span className="text-gradient">Ride Electric.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg lg:mx-0">
            Suneeta E Mobility ki smart electric bikes. Silent power, instant pickup aur petrol ke kharche se azaadi.
            Designed in India, made for every road.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <a
              href="#models"
              className="bg-volt group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white shadow-xl shadow-sky-brand/30 transition hover:scale-105 sm:w-auto"
            >
              Explore Models
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-sky-brand/30 bg-white px-7 py-3.5 font-semibold text-navy transition hover:border-sky-brand hover:text-sky-brand sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              Book Test Ride
            </a>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl border border-sky-brand/10 bg-white/80 p-3 shadow-sm backdrop-blur sm:p-4">
                <Icon className="mx-auto h-5 w-5 text-sky-brand lg:mx-0" />
                <dt className="sr-only">{label}</dt>
                <dd className="mt-2 font-display text-lg font-bold text-navy sm:text-2xl">{value}</dd>
                <dd className="text-[11px] text-ink sm:text-xs">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="absolute inset-x-6 top-1/2 aspect-square -translate-y-1/2 rounded-full border-2 border-dashed border-sky-brand/20 sm:inset-x-14" />
          <div className="absolute inset-x-16 top-1/2 aspect-square -translate-y-1/2 rounded-full bg-gradient-to-br from-sky-light/40 to-cyan-volt/10 blur-2xl sm:inset-x-24" />
          <div className="relative animate-float">
            <EVBike spin className="w-full drop-shadow-2xl" />
          </div>

          <div className="absolute top-2 left-0 hidden rounded-2xl bg-white/90 px-4 py-3 shadow-xl shadow-sky-brand/10 backdrop-blur sm:block">
            <p className="text-xs text-ink">Battery</p>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-2 w-24 overflow-hidden rounded-full bg-sky-soft">
                <div className="bg-volt h-full animate-charge rounded-full" />
              </div>
              <span className="font-display text-sm font-bold text-navy">98%</span>
            </div>
          </div>
          <div className="absolute right-0 bottom-4 hidden rounded-2xl bg-navy px-4 py-3 text-white shadow-xl sm:block">
            <p className="text-xs text-slate-300">Running cost</p>
            <p className="font-display text-lg font-bold">
              ₹0.25<span className="text-sm font-medium text-sky-light">/km</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

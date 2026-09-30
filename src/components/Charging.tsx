import { Home, PlugZap, Zap } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const SPECS = [
  { label: "Battery chemistry", value: "Lithium-ion LFP" },
  { label: "Water & dust rating", value: "IP67" },
  { label: "Battery life", value: "1,500+ cycles" },
  { label: "Motor peak power", value: "Up to 7 kW" },
];

const OPTIONS = [
  { icon: Home, title: "Home Charging", text: "Portable charger, any 15A socket" },
  { icon: Zap, title: "Quick Charging", text: "Full charge in about 4 hours" },
];

export default function Charging() {
  return (
    <section id="charging" className="relative overflow-hidden bg-navy py-20 text-slate-300 sm:py-28">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sky-brand/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          dark
          eyebrow="Battery & charging"
          title="Power that"
          highlight="keeps you going"
          text="Safe, smart and long-lasting power with an advanced battery management system."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-10">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium text-white">
                  <PlugZap className="h-5 w-5 text-cyan-volt" /> Charging…
                </span>
                <span className="font-display text-sm text-sky-light">Fast mode</span>
              </div>

              {/* battery graphic */}
              <div className="mt-6 flex items-center">
                <div className="relative h-24 flex-1 overflow-hidden rounded-2xl border-4 border-sky-light/70 p-2 sm:h-28">
                  <div className="bg-volt h-full animate-charge rounded-lg shadow-[0_0_40px_#22d3ee]" />
                  <Zap className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 fill-white text-white drop-shadow" />
                </div>
                <div className="ml-1 h-10 w-3 rounded-r-md bg-sky-light/70" />
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-4">
                {SPECS.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-white/5 p-4">
                    <dt className="text-xs text-slate-400">{s.label}</dt>
                    <dd className="mt-1 font-display text-lg font-semibold text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="space-y-4">
            {OPTIONS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 120}>
                <div className="flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-sky-brand/50 hover:bg-white/10 sm:p-6">
                  <span className="bg-volt grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg shadow-sky-brand/30">
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold !text-white">{title}</h3>
                    <p className="text-sm">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

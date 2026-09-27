import { BatteryCharging, IndianRupee, Leaf, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const FEATURES = [
  {
    icon: Leaf,
    title: "Zero Pollution",
    text: "No petrol and no smoke. Every ride keeps the air of your city clean.",
  },
  {
    icon: IndianRupee,
    title: "Ultra Low Running Cost",
    text: "Sirf ₹0.25 per km. Petrol bike ke comparison me 90% tak bachat.",
  },
  {
    icon: BatteryCharging,
    title: "Fast Charging",
    text: "Full charge in about 4 hours. Charge at home from a normal 15A socket.",
  },
  {
    icon: Smartphone,
    title: "Smart Connectivity",
    text: "App se battery status, GPS tracking, geo-fencing aur ride history dekhein.",
  },
  {
    icon: Wrench,
    title: "Low Maintenance",
    text: "No engine oil, clutch or spark plugs. Fewer moving parts means less servicing.",
  },
  {
    icon: ShieldCheck,
    title: "3 Year Battery Warranty",
    text: "IP67-rated waterproof lithium-ion battery with a 3 year warranty.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why go electric"
          title="Built for a"
          highlight="smarter ride"
          text="Har Suneeta bike me technology, comfort aur savings ek saath milte hain."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-sky-brand/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-brand/30 hover:shadow-xl hover:shadow-sky-brand/10">
                <div className="bg-volt absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition group-hover:opacity-30" />
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-soft text-sky-brand transition group-hover:bg-sky-brand group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 leading-relaxed">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

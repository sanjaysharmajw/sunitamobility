"use client";

import { useState } from "react";
import { Fuel, PiggyBank, Zap } from "lucide-react";
import SectionHeading from "./SectionHeading";

const EV_COST_PER_KM = 0.25;
const PETROL_MILEAGE = 45; // km per litre, typical commuter bike

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export default function Calculator() {
  const [km, setKm] = useState(40);
  const [petrol, setPetrol] = useState(105);

  const monthlyKm = km * 30;
  const petrolCost = (monthlyKm / PETROL_MILEAGE) * petrol;
  const evCost = monthlyKm * EV_COST_PER_KM;
  const saving = petrolCost - evCost;

  return (
    <section id="savings" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Savings calculator"
          title="See how much you"
          highlight="save every month"
          text="Apni daily riding daaliye aur dekhiye EV se kitni bachat hoti hai."
        />

        <div className="mt-14 grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-sky-brand/10 ring-1 ring-sky-brand/10 lg:grid-cols-5">
          <div className="space-y-8 p-6 sm:p-10 lg:col-span-3">
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="km" className="font-medium text-navy">
                  Daily riding
                </label>
                <span className="rounded-full bg-sky-soft px-3 py-1 font-display font-bold text-sky-brand">{km} km</span>
              </div>
              <input id="km" type="range" min={5} max={150} step={5} value={km} onChange={(e) => setKm(+e.target.value)} className="mt-4 w-full" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="petrol" className="font-medium text-navy">
                  Petrol price (per litre)
                </label>
                <span className="rounded-full bg-sky-soft px-3 py-1 font-display font-bold text-sky-brand">₹{petrol}</span>
              </div>
              <input id="petrol" type="range" min={90} max={130} step={1} value={petrol} onChange={(e) => setPetrol(+e.target.value)} className="mt-4 w-full" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5">
                <Fuel className="h-6 w-6 text-rose-500" />
                <p className="mt-3 text-sm">Petrol bike / month</p>
                <p className="font-display text-2xl font-bold text-rose-600">{inr(petrolCost)}</p>
              </div>
              <div className="rounded-2xl border border-sky-brand/20 bg-sky-soft p-5">
                <Zap className="h-6 w-6 text-sky-brand" />
                <p className="mt-3 text-sm">Suneeta EV / month</p>
                <p className="font-display text-2xl font-bold text-sky-brand">{inr(evCost)}</p>
              </div>
            </div>
            <p className="text-xs">Assumes {PETROL_MILEAGE} km/l petrol mileage and ₹{EV_COST_PER_KM}/km EV running cost, 30 days a month.</p>
          </div>

          <div className="bg-volt relative flex flex-col items-center justify-center overflow-hidden p-10 text-center text-white lg:col-span-2">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
            <PiggyBank className="h-12 w-12" />
            <p className="mt-4 text-sm font-medium text-white/85">You save every month</p>
            <p className="mt-1 font-display text-5xl font-bold sm:text-6xl">{inr(saving)}</p>
            <p className="mt-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold">{inr(saving * 12)} per year</p>
            <a href="#contact" className="mt-8 rounded-full bg-white px-6 py-3 font-semibold text-sky-brand shadow-lg transition hover:scale-105">
              Start saving today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

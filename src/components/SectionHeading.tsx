export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-sky-brand/30 bg-sky-brand/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-sky-brand uppercase">
        <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-cyan-volt" />
        {eyebrow}
      </span>
      <h2 className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${dark ? "!text-white" : ""}`}>
        {title} <span className="text-gradient">{highlight}</span>
      </h2>
      {text && <p className={`mt-4 text-base sm:text-lg ${dark ? "text-slate-300" : "text-ink"}`}>{text}</p>}
    </div>
  );
}

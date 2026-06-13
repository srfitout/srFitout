import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ServicePage({
  eyebrow,
  title,
  intro,
  image,
  offerings,
  audience,
  benefits,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  offerings: { heading: string; items: string[] }[];
  audience: string[];
  benefits?: string[];
}) {
  return (
    <>
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary)] via-[color:var(--primary)]/50 to-transparent" />
        <div className="relative container-x pb-16 text-[color:var(--cream)]">
          <div className="eyebrow text-[color:var(--accent)]">{eyebrow}</div>
          <h1 className="mt-5 font-display text-5xl md:text-7xl max-w-4xl leading-[1.02]">{title}</h1>
        </div>
      </section>

      <section className="container-x py-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="eyebrow">Overview</div>
          <p className="mt-4 font-display text-2xl leading-snug">{intro}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7 grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {offerings.map((o) => (
            <div key={o.heading} className="border-t border-[color:var(--primary)] pt-4">
              <h3 className="text-lg font-display">{o.heading}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {o.items.map((i) => <li key={i}>· {i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {benefits && (
        <section className="bg-[color:var(--secondary)] py-20">
          <div className="container-x">
            <div className="eyebrow">Benefits</div>
            <ul className="mt-8 grid md:grid-cols-3 gap-6">
              {benefits.map((b) => (
                <li key={b} className="bg-card p-6 rounded-sm flex gap-3">
                  <CheckCircle2 className="text-[color:var(--primary)] shrink-0 mt-0.5" size={18} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="container-x py-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="eyebrow">Built for</div>
          <h2 className="mt-3 text-3xl md:text-4xl">{audience.join(" · ")}</h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="text-muted-foreground">
            Ready to discuss scope, timeline and budget? We'll walk you through a tailored
            approach — no obligation.
          </p>
          <Link to="/contact" className="btn-primary mt-6">Request a Quote <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}

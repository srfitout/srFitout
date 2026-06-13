import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import about from "@/assets/about.jpg";

export const Route = createFileRoute("/_site/about")({
  head: () => ({
    meta: [
      { title: "About — SR Fitout" },
      { name: "description", content: "SR Fitout is an interior fit-out and civil construction studio focused on design-to-delivery execution." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="container-x pt-20 pb-16">
        <div className="eyebrow">Our Story</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-4xl leading-[1.02]">
          A studio of builders, designers &amp; <em className="text-[color:var(--primary)]">finishers</em>.
        </h1>
      </section>

      <section className="container-x grid md:grid-cols-12 gap-10 pb-24">
        <div className="md:col-span-7">
          <img src={about} alt="Interior craftsmanship" className="w-full h-[60vh] object-cover rounded-sm" loading="lazy" />
        </div>
        <div className="md:col-span-5 self-end">
          <p className="text-muted-foreground text-base/relaxed">
            SR Fitout was founded on a simple belief — that great spaces are built by people who take
            responsibility for every layer, from the slab to the styling. Over a decade in,
            we've delivered residences, workplaces and showrooms across the country with a tightly
            integrated team of designers, civil engineers, carpenters and project managers.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6">
            <div>
              <div className="font-display text-4xl text-[color:var(--primary)]">12+</div>
              <div className="eyebrow mt-1">Years</div>
            </div>
            <div>
              <div className="font-display text-4xl text-[color:var(--primary)]">240</div>
              <div className="eyebrow mt-1">Projects</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--secondary)] py-24">
        <div className="container-x grid md:grid-cols-3 gap-10">
          {[
            ["Mission", "Deliver interiors that elevate everyday life — beautiful, durable, on time and on budget."],
            ["Vision", "Be the most trusted turnkey fit-out studio in the country, project after project."],
            ["Values", "Craft. Transparency. Ownership. Quiet excellence over loud promises."],
          ].map(([t, d]) => (
            <div key={t}>
              <div className="eyebrow">{t}</div>
              <p className="mt-4 font-display text-2xl leading-snug">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x py-24">
        <div className="eyebrow">Advantages</div>
        <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl">Why clients keep coming back.</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-10">
          {[
            ["End-to-end execution", "Concept, civil, MEP, joinery, finishes and styling — one team, one timeline."],
            ["Design-to-delivery clarity", "Detailed BOQ, drawings and material specs you can hold us to."],
            ["Cost-effective sourcing", "Direct relationships with factories and suppliers we trust."],
            ["Snag-free handover", "Quality checklists, not just promises — and a post-handover service window."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-[color:var(--primary)] pt-5">
              <h3 className="text-xl">{t}</h3>
              <p className="mt-2 text-muted-foreground text-sm/relaxed">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link to="/contact" className="btn-primary">Work with us <ArrowUpRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}

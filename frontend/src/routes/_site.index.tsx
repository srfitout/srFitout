import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Hammer, Building2, Layers, Home as HomeIcon, CheckCircle2, Quote } from "lucide-react";
import hero from "@/assets/hero-living.jpg";
import commercial from "@/assets/commercial.jpg";
import modular from "@/assets/modular.jpg";
import civil from "@/assets/civil.jpg";
import residential from "@/assets/residential.jpg";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "SR Fitout — Interior Fit-Out & Civil Construction Studio" },
      { name: "description", content: "Premium residential, commercial, modular interiors and civil construction. Design-to-delivery turnkey solutions." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Hammer, title: "Civil Work", desc: "Masonry, partitioning, flooring, plastering & structural modifications.", to: "/services", img: civil },
  { icon: Building2, title: "Commercial Interior", desc: "Offices, retail, showrooms & corporate spaces engineered for productivity.", to: "/services", img: commercial },
  { icon: Layers, title: "Modular Interior", desc: "Modular kitchens, wardrobes & storage built for fit, finish and speed.", to: "/services", img: modular },
  { icon: HomeIcon, title: "Residential Interior", desc: "Personalised homes with premium finishes and tailored layouts.", to: "/services", img: residential },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end max-sm:items-center overflow-hidden">
        <img src={hero} alt="Designed living room" className="absolute inset-0 w-full h-full object-cover" width={1600} height={1100} />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary)] via-[color:var(--primary)]/40 to-transparent" />
        <div className="relative container-x pb-20 pt-32 text-[color:var(--cream)]">
          <div className="inline-flex items-center eyebrow text-[color:var(--accent)] bg-[color:var(--primary)]/75 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10 max-sm:text-[10px]">
            Interior Fit-Out · Civil · Modular
          </div>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl">
            Dream it.<br />
            <span className="italic text-[color:var(--accent)]">Create</span> it.<br />
            Live in it.
          </h1>
          <p className="mt-8 max-w-xl text-white/80 text-base/relaxed">
            SR Fitout is a turnkey interior &amp; construction studio crafting residences,
            workplaces and modular spaces with precision, care and a single point of accountability.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary !bg-[color:var(--accent)] !text-[color:var(--ink)] hover:!bg-white">
              Start a Project <ArrowUpRight size={16} />
            </Link>
            <Link to="/services" className="btn-ghost !border-white !text-white hover:!bg-white hover:!text-[color:var(--primary)]">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* STATS / MARQUEE */}
      <section className="bg-[color:var(--primary)] text-[color:var(--cream)] py-10 border-y border-white/10">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { n: "12+", l: "Years of Craft" },
            { n: "240", l: "Projects Delivered" },
            { n: "85%", l: "Repeat Clients" },
            { n: "30", l: "In-house Specialists" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display text-4xl md:text-5xl text-[color:var(--accent)]">{s.n}</div>
              <div className="eyebrow mt-2 text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="py-28">
        <div className="container-x grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-5">
            <div className="eyebrow">About the Studio</div>
            <h2 className="mt-4 text-4xl md:text-5xl">A studio for spaces that <em className="text-[color:var(--primary)]">work as beautifully as they look.</em></h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 text-muted-foreground text-base/relaxed">
            <p>
              We bring architects, builders and craftspeople under one roof — so concept, drawings, civil work,
              joinery and final styling stay aligned from day one to handover. The result is fewer surprises,
              tighter timelines and finishes that hold up to daily life.
            </p>
            <div className="mt-8">
              <Link to="/about" className="text-sm tracking-[0.2em] uppercase text-[color:var(--primary)] border-b border-[color:var(--primary)] pb-1 hover:text-[color:var(--accent-foreground)]">
                More about SR Fitout
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-[color:var(--secondary)] py-28">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow">What we do</div>
              <h2 className="mt-3 text-4xl md:text-5xl max-w-2xl">Four disciplines. One accountable team.</h2>
            </div>
            <Link to="/services" className="btn-ghost self-start">All Services <ArrowUpRight size={14} /></Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <Link key={s.title} to={s.to} className="group relative overflow-hidden rounded-sm bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-8">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <s.icon size={18} className="text-[color:var(--primary)]" />
                        <h3 className="text-2xl">{s.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground max-w-md">{s.desc}</p>
                    </div>
                    <ArrowUpRight className="text-[color:var(--primary)] group-hover:rotate-45 transition" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-28">
        <div className="container-x">
          <div className="eyebrow">Our Process</div>
          <h2 className="mt-3 text-4xl md:text-5xl max-w-3xl">From the first conversation to the day you move in.</h2>
          <div className="mt-14 grid md:grid-cols-5 gap-8 relative">
            {[
              ["01", "Consult", "Brief, site visit and feasibility."],
              ["02", "Design", "Layouts, 3D and material palettes."],
              ["03", "Estimate", "Transparent BOQ and timelines."],
              ["04", "Execute", "Civil, MEP, joinery and finishes."],
              ["05", "Handover", "Snag-free delivery with warranty."],
            ].map(([n, t, d]) => (
              <div key={n} className="border-t border-[color:var(--primary)] pt-5">
                <div className="font-display text-3xl text-[color:var(--accent-foreground)] text-[color:var(--primary)]">{n}</div>
                <div className="mt-3 font-display text-xl">{t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-[color:var(--primary)] text-[color:var(--cream)] py-28">
        <div className="container-x grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow text-white/50">Why SR Fitout</div>
            <h2 className="mt-4 text-4xl md:text-5xl">Built around <em className="text-[color:var(--accent)]">accountability</em>.</h2>
            <p className="mt-6 text-white/70 max-w-md">
              One contract, one team, one point of responsibility — design through delivery, with quality checks at every stage.
            </p>
          </div>
          <ul className="space-y-5">
            {[
              "End-to-end design-to-delivery execution",
              "In-house carpentry, MEP and civil teams",
              "Transparent BOQ &amp; fixed timelines",
              "Branded material warranties",
              "Daily on-site project supervisors",
              "Post-handover service window",
            ].map((t) => (
              <li key={t} className="flex gap-3 items-start border-b border-white/10 pb-4">
                <CheckCircle2 className="mt-0.5 text-[color:var(--accent)] shrink-0" size={20} />
                <span className="text-white/85" dangerouslySetInnerHTML={{ __html: t }} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-28">
        <div className="container-x max-w-4xl">
          <Quote className="text-[color:var(--accent)]" size={42} />
          <p className="mt-6 font-display text-3xl md:text-4xl leading-snug">
            "They handled civil, joinery and styling so we never juggled three vendors.
            The team treated our home like their own — and the finishes are flawless a year on."
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[color:var(--accent)] grid place-items-center font-display text-xl text-[color:var(--ink)]">A</div>
            <div>
              <div className="font-medium">Ananya &amp; Ravi Mehta</div>
              <div className="text-sm text-muted-foreground">Residence — Pune</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-28">
        <div className="rounded-sm bg-[color:var(--accent)] text-[color:var(--ink)] p-12 md:p-20 grid md:grid-cols-2 gap-10 items-center">
          <h2 className="text-4xl md:text-5xl">Have a space in mind? <em>Let's build it.</em></h2>
          <div className="md:justify-self-end">
            <Link to="/contact" className="btn-primary">Request a Consultation <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

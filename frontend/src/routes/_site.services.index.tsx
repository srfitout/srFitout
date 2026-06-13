import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Hammer, Building2, Layers, Home as HomeIcon, CheckCircle2 } from "lucide-react";
import civilImg from "@/assets/civil.jpg";
import commercialImg from "@/assets/commercial.jpg";
import modularImg from "@/assets/modular.jpg";
import residentialImg from "@/assets/residential.jpg";

export const Route = createFileRoute("/_site/services/")({
  head: () => ({
    meta: [
      { title: "Our Services — SR Fitout" },
      { name: "description", content: "Civil work, commercial interiors, modular interiors and residential interiors — all under one accountable team." },
    ],
  }),
  component: ServicesPage,
});

const tabs = [
  {
    id: "civil",
    label: "Civil Work",
    icon: Hammer,
    eyebrow: "Civil Work",
    title: <>Structure, executed <em className="text-[color:var(--accent)]">cleanly</em>.</>,
    intro: (
      <>
        Our civil work services provide exceptional quality and precision for both residential and commercial construction. From planning to execution, we focus on creating structures that are strong, durable, and designed to stand the test of time, ensuring complete client satisfaction.
        <br />
        <br />
        We offer a full range of civil engineering services, including site preparation, structural construction, concrete work, and foundation laying. Our team of skilled professionals works with the latest techniques and industry standards to deliver projects efficiently and effectively. Whether you're building a home, an office, or a larger commercial complex, we ensure each project meets your specific requirements, while also adhering to all safety regulations and building codes.
      </>
    ),
    image: civilImg,
    offerings: [
      { heading: "Structural Work", items: ["Masonry", "Partitioning", "Flooring systems"] },
      { heading: "Construction", items: ["Renovation", "Site preparation", "Building modifications"] },
      { heading: "Infrastructure", items: ["Wall construction", "Plastering", "Ceiling systems"] },
      { heading: "Finishing", items: ["Waterproofing", "Tiling", "Surface prep"] },
    ],
    audience: ["Builders", "Developers", "Commercial owners"],
    benefits: null,
  },
  {
    id: "commercial",
    label: "Commercial Interior",
    icon: Building2,
    eyebrow: "Commercial Interior",
    title: <>Workplaces that <em className="text-[color:var(--accent)]">work</em>.</>,
    intro: (
      <>
        Our commercial interior design services specialize in creating functional, aesthetically pleasing spaces for businesses. Whether it’s an office, retail space, or hospitality venue, we focus on maximizing the potential of every area while reflecting your brand’s identity and values.
        <br />
        <br />
        We understand the unique needs of commercial spaces and offer tailored designs that combine creativity with functionality. Our services include space planning, layout design, custom furniture, lighting, and color schemes. We aim to optimize workflow and enhance the customer experience, ensuring that each space aligns with your business goals. Whether you’re renovating or starting from scratch, we work closely with you to bring your vision to life in a practical and efficient way.
      </>
    ),
    image: commercialImg,
    offerings: [
      { heading: "Office Interiors", items: ["Workstations", "Conference rooms", "Reception areas"] },
      { heading: "Retail Interiors", items: ["Showrooms", "Stores", "Display units"] },
      { heading: "Corporate Spaces", items: ["Executive cabins", "Collaborative spaces", "Breakout zones"] },
      { heading: "Hospitality", items: ["Cafés", "Lounges", "Client suites"] },
    ],
    audience: ["Businesses", "Corporations", "Retail brands"],
    benefits: [
      "Productivity-led space planning",
      "Brand-aligned material palettes",
      "Efficient utilisation per sq.ft.",
    ],
  },
  {
    id: "modular",
    label: "Modular Interior",
    icon: Layers,
    eyebrow: "Modular Interior",
    title: <>Factory-finished. <em className="text-[color:var(--accent)]">Site-perfect.</em></>,
    intro: "Our modular interior design services offer flexible, innovative solutions that adapt to your needs. We specialize in creating efficient, customizable spaces using modular furniture and components, providing easy installation, scalability, and cost-effectiveness without compromising on style or functionality.",
    image: modularImg,
    offerings: [
      { heading: "Modular Furniture", items: ["Cabinets", "Storage systems", "Workstations"] },
      { heading: "Modular Kitchens", items: ["Layouts (L, U, parallel)", "Hardware & accessories", "Storage optimisation"] },
      { heading: "Wardrobes", items: ["Sliding & openable", "Walk-in", "Custom internals"] },
      { heading: "Space Optimisation", items: ["Custom modules", "Flexible interiors", "Smart storage"] },
    ],
    audience: ["Homeowners", "Offices", "Commercial spaces"],
    benefits: [
      "Faster installation timelines",
      "Cost-efficient at scale",
      "Modern, durable aesthetics",
    ],
  },
  {
    id: "residential",
    label: "Residential Interior",
    icon: HomeIcon,
    eyebrow: "Residential Interior",
    title: <>Homes designed for <em className="text-[color:var(--accent)]">how you live</em>.</>,
    intro: "Our residential interior design services focus on creating personalized, stylish spaces that reflect your lifestyle and preferences. From cozy apartments to spacious homes, we transform interiors into functional and aesthetically pleasing environments, ensuring comfort, elegance, and harmony throughout.",
    image: residentialImg,
    offerings: [
      { heading: "Living Spaces", items: ["Living room design", "Dining areas", "Foyer & entryways"] },
      { heading: "Bedrooms", items: ["Master suites", "Kids' rooms", "Guest bedrooms"] },
      { heading: "Kitchen & Wardrobe", items: ["Modular kitchens", "Walk-in wardrobes", "Pantry storage"] },
      { heading: "Detailing", items: ["False ceiling", "Lighting design", "Soft furnishing"] },
    ],
    audience: ["Homeowners", "Apartment owners", "Villa owners"],
    benefits: [
      "Personalised, on-brief design",
      "Premium, branded finishes",
      "Space optimisation for daily life",
    ],
  },
];

function ServicesPage() {
  const [active, setActive] = useState("civil");
  const service = tabs.find((t) => t.id === active)!;

  return (
    <>
      {/* Header */}
      <section className="container-x pt-20 pb-12">
        <div className="eyebrow">Our Services</div>
        <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-4xl leading-[1.02]">
          A single team for every <em className="text-[color:var(--primary)]">layer of your space</em>.
        </h1>
        <p className="mt-6 max-w-2xl text-muted-foreground">
          From foundation work to final styling — SR Fitout handles civil construction, commercial fit-outs,
          modular installations and bespoke residential interiors.
        </p>
      </section>

      {/* Tabs */}
      <div className="container-x">
        <div className="flex flex-wrap gap-2 border-b border-border pb-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex items-center gap-2 px-5 py-3 text-sm tracking-[0.12em] uppercase rounded-t-sm transition-all border-b-2 ${isActive
                    ? "border-[color:var(--primary)] text-[color:var(--primary)] bg-[color:var(--secondary)]"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Service Content */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden mt-8">
        <img src={service.image} alt={service.eyebrow} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary)] via-[color:var(--primary)]/50 to-transparent" />
        <div className="relative container-x pb-14 text-[color:var(--cream)]">
          <div className="eyebrow text-[color:var(--accent)]">{service.eyebrow}</div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl max-w-4xl leading-[1.02]">{service.title}</h2>
        </div>
      </section>

      <section className="container-x py-24 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="eyebrow">Overview</div>
          <p className="mt-4 font-display text-2xl leading-snug">{service.intro}</p>
        </div>
        <div className="md:col-span-6 md:col-start-7 grid sm:grid-cols-2 gap-x-8 gap-y-10">
          {service.offerings.map((o) => (
            <div key={o.heading} className="border-t border-[color:var(--primary)] pt-4">
              <h3 className="text-lg font-display">{o.heading}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {o.items.map((i) => (
                  <li key={i}>· {i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {service.benefits && (
        <section className="bg-[color:var(--secondary)] py-20 mb-20">
          <div className="container-x">
            <div className="eyebrow">Benefits</div>
            <ul className="mt-8 grid md:grid-cols-3 gap-6">
              {service.benefits.map((b) => (
                <li key={b} className="bg-card p-6 rounded-sm flex gap-3">
                  <CheckCircle2 className="text-[color:var(--primary)] shrink-0 mt-0.5" size={18} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="container-x pb-24 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-6">
          <div className="eyebrow">Built for</div>
          <h2 className="mt-3 text-3xl md:text-4xl">{service.audience.join(" · ")}</h2>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <p className="text-muted-foreground">
            Ready to discuss scope, timeline and budget? We'll walk you through a tailored
            approach — no obligation.
          </p>
          <Link to="/contact" className="btn-primary mt-6">
            Request a Quote <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-[color:var(--primary)] text-[color:var(--cream)] py-20">
        <div className="container-x">
          <div className="eyebrow text-white/50">Project Workflow</div>
          <h2 className="mt-3 text-4xl">Five steps, zero handoffs.</h2>
          <div className="mt-12 grid md:grid-cols-5 gap-6">
            {["Consultation", "Planning", "Design", "Execution", "Handover"].map((s, i) => (
              <div key={s} className="border-t border-white/20 pt-5">
                <div className="font-display text-3xl text-[color:var(--accent)]">0{i + 1}</div>
                <div className="mt-2 text-lg">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

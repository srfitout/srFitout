import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/SR_logo.png";
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[color:var(--primary)] shadow-lg" : "bg-[color:var(--primary)]/95 backdrop-blur"
        }`}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoAsset} alt="SR Fitout" className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => {
            const active = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`text-xs tracking-[0.18em] uppercase transition-colors ${active ? "text-[color:var(--accent)]" : "text-[color:var(--cream)] hover:text-[color:var(--accent)]"
                  }`}
              >
                {n.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="text-xs tracking-[0.18em] uppercase px-5 py-3 rounded-full bg-[color:var(--accent)] text-[color:var(--ink)] hover:opacity-90 transition"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-[color:var(--cream)] p-2"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[color:var(--primary)] border-t border-white/10">
          <div className="container-x py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm tracking-[0.2em] uppercase text-[color:var(--cream)] hover:text-[color:var(--accent)]"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const { location } = useRouterState();
  const isServicesPage = location.pathname.startsWith("/services");

  return (
    <footer className={`bg-[color:var(--primary)] text-[color:var(--cream)] ${isServicesPage ? "" : "mt-32"}`}>
      <div className="container-x py-20 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <img src={logoAsset} alt="SR Fitout" className="h-16 w-auto -ml-2" />
          <p className="mt-6 max-w-md text-sm/relaxed text-white/70">
            Turnkey interior fit-out and civil construction studio. We design, build and deliver spaces
            that elevate how people live and work.
          </p>
          {/* <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 grid place-items-center rounded-full border border-white/20 hover:bg-[color:var(--accent)] hover:text-[color:var(--ink)] hover:border-transparent transition">
                <Icon size={16} />
              </a>
            ))}
          </div> */}
        </div>

        <div>
          <div className="eyebrow text-white/50">Navigate</div>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.slice(0, 4).map((n) => (
              <li key={n.to}><Link to={n.to} className="text-white/80 hover:text-[color:var(--accent)]">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="eyebrow text-white/50">Contact</div>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><Phone size={14} className="mt-1 text-[color:var(--accent)]" /> +91 98456 66991</li>
            <li className="flex gap-2"><Mail size={14} className="mt-1 text-[color:var(--accent)]" /> support@srfitout.com</li>
            <li className="flex gap-2"><MapPin size={14} className="mt-1 text-[color:var(--accent)]" /> Frazer Town , Bengaluru , 560001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 text-xs text-white/50 flex flex-col md:flex-row justify-between gap-3">
          <span>© {new Date().getFullYear()} SR Fitout. Dream · Create · Live.</span>
          <span className="tracking-[0.2em] uppercase">
            Developed by{" "}
            <a
              href="https://www.rhinonlabs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-[color:var(--accent)] transition-colors"
            >
              Rhinon Labs
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="pt-20 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

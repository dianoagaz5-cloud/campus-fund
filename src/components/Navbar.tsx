import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Settings } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/eligibility", label: "Éligibilité" },
  { to: "/testimonials", label: "Témoignages" },
  { to: "/user-space", label: "Mon Espace" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <header className="sticky top-0 z-50" style={{ background: "#0d3d2e" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium transition-colors"
                style={{ color: active ? "#c9a84c" : "rgba(255,255,255,0.85)" }}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            to="/loan-application"
            className="ml-2 px-5 py-2 rounded-full text-sm font-semibold transition-transform hover:scale-105"
            style={{ background: "#c9a84c", color: "#0d3d2e" }}
          >
            Demander un prêt
          </Link>
        </nav>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 pb-4">
          <div className="px-4 py-3 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base"
                style={{ color: path === l.to ? "#c9a84c" : "rgba(255,255,255,0.9)" }}
              >
                {l.label}
              </Link>
            ))}

            <Link
              to="/loan-application"
              onClick={() => setOpen(false)}
              className="mt-2 text-center px-5 py-2.5 rounded-full font-semibold"
              style={{ background: "#c9a84c", color: "#0d3d2e" }}
            >
              Demander un prêt
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer style={{ background: "#0d3d2e" }} className="text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <Logo size="lg" />
        <p
          className="text-sm font-medium tracking-wide mt-2"
          style={{ color: "#c9a84c", fontFamily: "var(--font-display)" }}
        >
          Accessibilité • Confiance • Organisation Professionnelle
        </p>
        <p className="text-xs text-white/50 mt-4">
          © 2026 CampusFund — Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

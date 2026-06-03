export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 32 : size === "lg" ? 56 : 40;
  const text = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="rounded-full flex items-center justify-center font-bold text-[#0d3d2e]"
        style={{
          width: dim,
          height: dim,
          background: "linear-gradient(135deg, #e3c97a 0%, #c9a84c 100%)",
          boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
          fontFamily: "var(--font-display)",
          fontSize: dim * 0.42,
        }}
      >
        CF
      </div>
      <div className={`font-display font-bold leading-none ${text}`} style={{ fontFamily: "var(--font-display)" }}>
        <span className="text-white">CAMPUS</span>
        <span style={{ color: "#c9a84c" }}>FUND</span>
      </div>
    </div>
  );
}

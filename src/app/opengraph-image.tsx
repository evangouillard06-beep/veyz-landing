import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Veyz · Assistant email IA pour agences immobilières";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0E1A",
          backgroundImage:
            "radial-gradient(900px 500px at 75% 15%, rgba(99,102,241,0.22), transparent 60%)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(99,102,241,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22D3EE",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 34, fontWeight: 600 }}>
            Veyz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#94A3B8",
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Pour les agences immobilières
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Le premier qui répond décroche le mandat.
          </div>
        </div>

        <div style={{ color: "#64748B", fontSize: 24 }}>
          Veyz prépare vos réponses. Vous validez, vous envoyez.
        </div>
      </div>
    ),
    { ...size },
  );
}

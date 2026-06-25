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
          backgroundColor: "#08090a",
          backgroundImage:
            "radial-gradient(900px 500px at 75% 15%, rgba(16,185,129,0.22), transparent 60%)",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid rgba(16,185,129,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#34d399",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            V
          </div>
          <div style={{ color: "#e7e9ea", fontSize: 34, fontWeight: 600 }}>
            Veyz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#9fb3ad",
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

        <div style={{ color: "#7c8a86", fontSize: 24 }}>
          Veyz prépare vos réponses. Vous validez, vous envoyez.
        </div>
      </div>
    ),
    { ...size },
  );
}

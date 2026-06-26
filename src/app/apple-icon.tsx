import { ImageResponse } from "next/og";

export const runtime = "edge";

// apple-touch-icon (180x180) généré : monogramme V émeraude sur fond sombre.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090a",
          color: "#34d399",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        V
      </div>
    ),
    { ...size },
  );
}

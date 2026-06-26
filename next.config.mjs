/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  // Redirection canonique www -> apex (une seule version indexée).
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.veyz.fr" }],
        destination: "https://veyz.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  // NB : la redirection www -> apex est gérée par Vercel (domaine principal),
  // PAS ici. Un redirect host dans next.config entre en conflit avec la
  // redirection de domaine Vercel et crée une boucle infinie. Voir README.
};

export default nextConfig;

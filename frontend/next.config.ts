import type { NextConfig } from "next";

/* El navegador habla siempre con localhost:3000. Next.js intercepta las
   peticiones que empiezan por /api y las reenvía por dentro a express,
   así no hay problemas de cross-origin ni con las cookies. */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL || "http://backend:4000"}/api/:path*`
      }
    ];
  }
};

export default nextConfig;

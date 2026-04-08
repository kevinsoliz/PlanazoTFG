import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", //intercepta cualquier petición que vaya a /api/... en el servidor de next.js
        destination: `${process.env.BACKEND_URL || "http://backend:4000"}/api/:path*` //la reenvía a al backend de express.
      }
    ];
  }
};
// el navegador nunca ve el backend, siempre habla con localhost:3000, las cookies viajan sin problemas de cross-origin (cors)

export default nextConfig;

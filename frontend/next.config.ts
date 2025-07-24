import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects() {
    return Promise.resolve([
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ]);
  },
};

export default nextConfig;

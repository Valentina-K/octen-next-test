import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    basePath: "/octen-next-test",
    images:{
        remotePatterns: [{
            protocol: 'https',
            hostname: "image.tmdb.org"
        }]

    }
};

export default nextConfig;

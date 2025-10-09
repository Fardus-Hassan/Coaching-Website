// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;




/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uccgroup.com.bd", "videos.examplecdn.com", "coaching.attendclub.top"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

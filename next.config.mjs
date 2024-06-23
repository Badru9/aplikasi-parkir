/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "freeimage.host",
      },
      {
        hostname: "iili.io",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fakepath",
      },
      {
        hostname: "",
      },
    ],
  },
};

export default nextConfig;

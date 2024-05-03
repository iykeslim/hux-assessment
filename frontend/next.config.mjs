/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        pathname: "/**",
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
    domains: ["ui-avatars.com"],
  },
}

export default nextConfig;

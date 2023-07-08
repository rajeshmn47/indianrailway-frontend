/** @type {import('next').NextConfig} */
const prod = "production" === process.env.NODE_ENV;

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: prod
      ? "https://web-production-e64c.up.railway.app"
      : "http://localhost:8000",
  },
};

module.exports = nextConfig;

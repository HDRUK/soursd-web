const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */

const nextConfig = withNextIntl({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_V1_URL: process.env.NEXT_PUBLIC_API_V1_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:locale/user/profile",
        destination: `/:locale/user/profile/details`,
      },
      {
        source: "/:locale/data-custodian/profile",
        destination: `/:locale/user/data-custodian/details`,
      },
      {
        source: "/:locale/organisation/profile",
        destination: `/:locale/organisation/profile/details`,
      },
      {
        source: "/:locale/organisation/profile",
        destination: `/:locale/organisation/profile/user`,
      },
      {
        source: "/:locale",
        destination: "/:locale/homepage",
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (process.env.NEXT_WEBPACK_USEPOLLING) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }

    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/node": false,
      };
    }

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);

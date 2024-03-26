const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */

const nextConfig = withNextIntl({
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_V1_URL: process.env.NEXT_PUBLIC_API_V1_URL,
        API_V1_IP_URL: process.env.NEXT_PUBLIC_API_V1_IP_URL,
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
    webpack: config => {
        if (process.env.NEXT_WEBPACK_USEPOLLING) {
            config.watchOptions = {
                poll: 500,
                aggregateTimeout: 300,
            };
        }
        return config;
    },
    async redirects() {
        return [
            {
                source: "/about/terms-and-conditions",
                destination: "/terms-and-conditions",
                permanent: true,
            },
        ];
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
});

module.exports = nextConfig;

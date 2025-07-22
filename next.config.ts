// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // The 'experimental.allowedDevOrigins' flag is deprecated or moved in Next.js 15.x
  // and is causing a build warning. It's typically for development environments
  // and not needed for production builds on Firebase App Hosting.
  // We are removing it to resolve the build warning.
  // If you need specific origins for local development, consider managing
  // this outside of the main production config or using environment variables.
  experimental: {
    // allowedDevOrigins: [ // Removed or commented out
    //   'https://9000-firebase-studio-1750485396454.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev',
    // ],
  },

  // Configure Webpack to handle WebAssembly (.wasm) modules
  webpack: (config, { isServer }) => {
    // Enable WebAssembly as an experimental feature for Webpack 5.
    // 'asyncWebAssembly' is recommended for asynchronously loaded WASM modules.
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Add a rule to tell Webpack how to handle .wasm files.
    // It should treat them as 'webassembly/async' type modules.
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    return config;
  },
};

export default nextConfig;
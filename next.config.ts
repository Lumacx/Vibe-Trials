// next.config.ts
import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
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
      {
        protocol: 'https',
        hostname: 'studioswai.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {},
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    config.module.rules = config.module.rules.filter(
      (rule: RuleSetRule) =>
        typeof rule !== 'string' &&
        rule.test &&
        !rule.test.toString().includes('wasm')
    );

    config.module.rules.unshift({
      test: /\.wasm$/,
      type: 'webassembly/async',
      generator: {
        filename: 'static/wasm/[name].[contenthash].wasm',
      },
    });

    return config;
  },
};

export default nextConfig;

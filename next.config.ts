import path from 'path';
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
  experimental: {
    serverActions: {},
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@vibe-components': path.resolve(__dirname, 'src/components'),
      '@manifest': path.resolve(__dirname, 'dojo/contracts/target/manifest_dev.json'),
      '#/dojo/config/manifest': path.resolve(__dirname, 'dojo/config/manifest.ts'),
    };

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    config.module.rules = config.module.rules.filter(
      (rule: RuleSetRule) =>
        !(typeof rule === 'object' && rule.type === 'webassembly/async')
    );

    config.module.rules.unshift({
      test: /\.wasm$/,
      type: 'webassembly/async',
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/@dojoengine'),
      ],
      generator: {
        filename: 'static/wasm/[name].[contenthash].wasm',
      },
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });

    config.module.rules.push({
      test: /\.css$/i,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['tailwindcss', 'autoprefixer'],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
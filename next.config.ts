import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';
import path from 'path';

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
    // ✅ Activar soporte para WebAssembly y top-level await
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    // 🔥 Eliminar reglas antiguas que interfieran con .wasm
    config.module.rules = config.module.rules.filter(
      (rule: RuleSetRule) =>
        typeof rule !== 'string' &&
        rule.test &&
        !rule.test.toString().includes('wasm')
    );

    // 📦 Regla personalizada para .wasm (incluye @dojoengine)
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

    // ⚙️ Babel-loader para TypeScript
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

    // ✅ Activar soporte para TailwindCSS/PostCSS (sin romper Next)
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

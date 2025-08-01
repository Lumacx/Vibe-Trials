// next.config.js
import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';
import path from 'path';
import webpack from 'webpack';

const nextConfig: NextConfig = {
  // Add this line to enable static export
  output: 'export',
  
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
  transpilePackages: ['browserslist'],
  experimental: {
    serverActions: {},
  },
  // Keep the headers function to define the CSP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // ... (rest of your webpack config, unchanged)
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@vibe-components': path.resolve(__dirname, 'src/components'),
      '@manifest': path.resolve(__dirname, 'dojo/contracts/target/manifest_dev.json'),
      '#/dojo/config/manifest': path.resolve(__dirname, 'dojo/config/manifest.ts'),
      'browserslist': path.resolve(__dirname, 'node_modules/browserslist'),
      'browserslist-stats.json': path.resolve(__dirname, 'empty-json.js'),
    };
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };
    config.module.rules = config.module.rules.filter(
      (rule: RuleSetRule) =>
        !(
          typeof rule === 'object' &&
          rule.type === 'webassembly/async'
        )
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
    config.module.rules.push({
      test: /browserslist/,
      loader: 'babel-loader',
      options: {
        presets: ['next/babel'],
      },
    });
    config.module.rules.push({
      test: /\.json$/,
      type: 'asset/resource',
    });
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /browserslist-stats\.json/,
        contextRegExp: /browserslist[\\/]node_modules[\\/]browserslist$/,
      })
    );
    return config;
  },
};

export default nextConfig;
import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';
import path from 'path';
import webpack from 'webpack'; // Ensure this is imported

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
  transpilePackages: ['browserslist'],
  experimental: {
    serverActions: {},
  },
  webpack: (config, { isServer }) => {
    // Webpack alias configuration
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
      '@vibe-components': path.resolve(__dirname, 'src/components'),
      '@manifest': path.resolve(__dirname, 'dojo/contracts/target/manifest_dev.json'),
      '#/dojo/config/manifest': path.resolve(__dirname, 'dojo/config/manifest.ts'),
      'browserslist': path.resolve(__dirname, 'node_modules/browserslist'),
      'browserslist-stats.json': path.resolve(__dirname, 'empty-json.js'), // Keep this bypass
    };

    // Enable WebAssembly and top-level await experiments
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    // Filter out existing WebAssembly rules
    config.module.rules = config.module.rules.filter(
      (rule: RuleSetRule) =>
        !(
          typeof rule === 'object' &&
          rule.type === 'webassembly/async'
        )
    );

    // Custom rule for .wasm files
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

    // Explicit Babel-loader rule for TypeScript files
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

    // --- RE-ENABLING CUSTOM CSS/POSTCSS/TAILWINDCSS RULE ---
    // This rule is necessary if Next.js's default CSS handling is not sufficient for your setup.
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
    // --- END RE-ENABLE ---

    // Rule for browserslist (kept for consistency, might be bypassed by alias)
    config.module.rules.push({
      test: /browserslist/,
      loader: 'babel-loader',
      options: {
        presets: ['next/babel'],
      },
    });

    // Handle JSON files from node_modules specifically (general rule)
    config.module.rules.push({
      test: /\.json$/,
      type: 'asset/resource',
    });

    // IgnorePlugin for browserslist-stats.json
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /browserslist-stats\.json/,
        contextRegExp: /browserslist[\\/]node_modules[\\/]browserslist$/,
      })
    );

    // NormalModuleReplacementPlugin for browserslist (if still needed)
    // if (!isServer) {
    //     config.plugins.push(
    //         new webpack.NormalModuleReplacementPlugin(
    //             /browserslist\/node/,
    //             path.resolve(__dirname, 'browserslist/index')
    //         )
    //     );
    // }

    return config;
  },
};

export default nextConfig;
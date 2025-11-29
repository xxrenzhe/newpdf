/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// Load locale configuration for pdfeditor
const LANG_CODE = 'en';
const localeFilePath = path.resolve(__dirname, 'src/lib/pdfeditor/assets/locale', `${LANG_CODE}.json`);
const LANG_MESSAGES = fs.existsSync(localeFilePath)
  ? JSON.parse(fs.readFileSync(localeFilePath, 'utf-8'))
  : {};

const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],

  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },

  // Configure webpack for pdfeditor assets
  webpack: (config, { isServer }) => {
    // Custom loader to wrap HTML/PHTML as template functions
    config.module.rules.push({
      test: /\.(phtml|html)$/,
      use: [
        {
          loader: path.resolve(__dirname, 'webpack-html-function-loader.js')
        }
      ]
    });

    // Handle font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });

    // Increase chunk loading timeout for large libraries like pdfeditor
    if (!isServer) {
      config.output = {
        ...config.output,
        chunkLoadTimeout: 60000, // 60 seconds instead of default 120s
      };
    }

    // Optimize chunk splitting for pdfeditor
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization?.splitChunks,
        cacheGroups: {
          ...config.optimization?.splitChunks?.cacheGroups,
          pdfeditor: {
            test: /[\\/]src[\\/]lib[\\/]pdfeditor[\\/]/,
            name: 'pdfeditor',
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Inject global variables required by pdfeditor
    config.plugins.push(
      new webpack.DefinePlugin({
        LANG_CODE: JSON.stringify(LANG_CODE),
        LANG_MESSAGES: JSON.stringify(LANG_MESSAGES),
        ASSETS_URL: JSON.stringify('/assets/'),
      })
    );

    return config;
  },
};

module.exports = nextConfig;

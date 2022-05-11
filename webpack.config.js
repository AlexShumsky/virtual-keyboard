const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
};
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);
const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        //hmr: isDev,
        //reloadAll: true
      }
    },
    'css-loader'
  ];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};
const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: []
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};
const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    /*new CopyWebpackPlugin(
			{
					patterns: [
						{
								from: path.resolve(__dirname, 'src/assets/images/favicon.ico'),
								to: path.resolve(__dirname, 'dist')
						}
					]
			}
		),*/
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ];
  //if (isProd) base.push(new BundleAnalyzerPlugin())
  return base;
};
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js']
    //analytics: './analytics.ts' <-- include addition scripts
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist/')
  },
  optimization: optimization(),
  devServer: {
    hot: false,
    liveReload: true,
    port: 4200
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: false }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: cssLoaders()
      },
      {
        test: /\.less$/i,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(__dirname, './src/styles/style.scss')]
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        }
      }
    ]
  }
};

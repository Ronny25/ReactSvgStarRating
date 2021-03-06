const resolve = require('./location');
const {TsconfigPathsPlugin} = require('tsconfig-paths-webpack-plugin/lib/index');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  mode: 'production',
  entry: resolve('./src/index.tsx'),
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
    publicPath: '/',
    globalObject: 'this'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {discardComments: {removeAll: true}}
      })
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    }
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: 'starrating-[local]',
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'ts-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'index.css'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({configFile: resolve('./tsconfig.json')})
    ]
  },
  devServer: {
    inline: false,
    contentBase: resolve('./src')
  }
};

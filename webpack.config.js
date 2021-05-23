const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const production = process.env.NODE_ENV === 'production'
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack')

const pages = ['index']

const generateEntryPoints = (entry) => {
  return entry.reduce((obj, item) => {
    return {
      ...obj,
      [item]: [
        'regenerator-runtime',
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        path.resolve('src', 'entrypoints', `${item}.tsx`)]
    }
  }, {})
}
console.log(generateEntryPoints(pages))

const generateHtml = (entry) => {
  return entry.map((i) => {
    return new HtmlWebpackPlugin({
      chunks: [i],
      filename: `../views/${i}.ejs`,
      template: path.join('src', 'views', 'template.ejs')
    })
  })
}
const config = [{
  mode: production ? 'production' : 'development',
  entry: {
    ...generateEntryPoints(pages)
  },

  output: {
    path: production ? path.resolve(__dirname, 'dist', 'static', 'public') : path.resolve(__dirname, 'src', 'static', 'public'),
    filename: production ? 'js/[chunkhash].js' : 'js/[name].js',
    publicPath: '/public',
    hotUpdateChunkFilename: './hmr/[id].[hash].hot-update.js',
    hotUpdateMainFilename: './hmr/[runtime].[hash].hot-update.json',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: [['@babel/plugin-transform-regenerator', { async: true }]]
        },
        exclude: [/node_modules/, /static/]
      }, {
        test: /\.ejs$/,
        loader: 'raw-loader'
      }, {
        test: /\.(css)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/public/css'
          }

        }, 'css-loader']

      }, {
        test: /\.(scss|sass)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '/public/css'
          }
        }, 'css-loader', 'sass-loader']
      }, {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: production ? '[md5:hash:hex].[ext]' : '[name].[ext]',
            publicPath: '/public/img',
            outputPath: 'img'
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.wasm', '.mjs', '*']
  },
  devtool: 'eval-source-map',
  optimization: !production ? undefined : {
    splitChunks: {
      automaticNameDelimiter: '.',
      cacheGroups: {
        react: {
          chunks: 'initial',
        },
      },
    },
  },

  stats: {
    colors: true
  },

  plugins: [
    // new CleanWebpackPlugin(),
    // create blog,
    !production && new webpack.HotModuleReplacementPlugin(),
    !production && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: production ? 'css/[contentHash].css' : 'css/[id].css',
      chunkFilename: production ? 'css/[contentHash].css' : 'css/[id].css'
    }),
    // Ejs pages
    ...generateHtml(pages)
  ]
}]

module.exports = config

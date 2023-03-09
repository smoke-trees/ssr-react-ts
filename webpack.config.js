const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const production = process.env.NODE_ENV === 'production'
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const { getCompilerHooks, WebpackManifestPlugin } = require('webpack-manifest-plugin')
const webpack = require('webpack');
const ReplacePlugin = require('webpack-plugin-replace');

const getBabelPlugins = () => {
  const plugins = [
    '@babel/plugin-transform-regenerator',
  ]
  if (!production) {
    plugins.push(require.resolve('react-refresh/babel'))
  }
  return plugins
}


class ReplaceVendorPlugin {
  apply(compiler) {
    const { afterEmit } = getCompilerHooks(compiler);

    afterEmit.tap('ReplaceVendorPlugin', (manifest) => {
      console.log(manifest)
    });
  }
}


const generateHtml = (entry) => {
  return entry.map((i) => {
    return new HtmlWebpackPlugin({
      chunks: [i],
      filename: `../views/${i}.ejs`,
      template: path.join('src', 'views', 'header.ejs')
    })
  })
}
const config = [{
  entry: {
    vendor: !production ? [
      'regenerator-runtime',
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      path.resolve('src', 'entrypoints', `entry.tsx`)] : [
      'regenerator-runtime',
      path.resolve('src', 'entrypoints', `entry.tsx`)
    ]
  },
  mode: production ? 'production' : 'development',

  output: {
    path: production ? path.resolve(__dirname, 'dist', 'static', 'public') : path.resolve(__dirname, 'src', 'static', 'public'),
    filename: production ? 'js/[name].[chunkhash].js' : 'js/[name].js',
    publicPath: process.env.PUBLIC_PATH || '/public/',
    hotUpdateChunkFilename: './hmr/[id].hot-update.js',
    hotUpdateMainFilename: './hmr/[runtime].hot-update.json',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          plugins: getBabelPlugins()
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
            // publicPath: process.env.PUBLIC_PATH || '/public/css'
          }

        }, 'css-loader']

      }, {
        test: /\.(scss|sass)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // publicPath: process.env.PUBLIC_PATH || '/public/css'
          }
        }, 'css-loader', 'sass-loader']
      }, {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: production ? '[md5:hash:hex].[ext]' : '[name].[ext]',
            // publicPath: '/public/img',
            outputPath: 'img'
          }
        }]
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.wasm', '.mjs', '*']
  },
  devtool: !production ? 'eval-source-map' : undefined,
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
    new WebpackManifestPlugin({}),
    // new CleanWebpackPlugin(),
    // create blog,
    new MiniCssExtractPlugin({
      filename: production ? 'css/[contenthash].css' : 'css/[id].css',
      chunkFilename: production ? 'css/[contenthash].css' : 'css/[id].css'
    }),
    // Ejs pages
    // ...generateHtml(pages),
    new CopyPlugin({
      patterns: [
        { from: 'src/views/partials', to: '../views' },
        { from: 'src/views/footer.ejs', to: '../views/footer.ejs' }
      ]
    })
  ]
}]

if (!production) {
  config[0].plugins.push(new webpack.HotModuleReplacementPlugin())
  config[0].plugins.push(new ReactRefreshWebpackPlugin())
  // config[0].plugins.push(new ReplaceVendorPlugin())
}


module.exports = config

const join = require('path').join
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const assetsPath = (...relativePath) => join(__dirname, ...relativePath)
module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/entry.js',
    vendor: [ 'dva-vue' ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      './node_modules',
      '../dva-vue/node_modules'
    ]
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [assetsPath('src')]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [`css-loader`]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'css/[name].css'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      chunks: ['app', 'vendor'],
      filename: `index.html`,
      template: './src/tpl.html'
    })
  ]
}

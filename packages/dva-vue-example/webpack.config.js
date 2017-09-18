const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    }
    ]
  },
  plugins: [
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

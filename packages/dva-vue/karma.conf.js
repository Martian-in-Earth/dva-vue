
module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    plugins: [
      'karma-chai',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],
    preprocessors: {
      'test/**/*-test.js': ['webpack', 'sourcemap']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'stage-0']
              }
            }
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      }
    },
    files: [
      'test/**/*-test.js'
    ]
  })
}

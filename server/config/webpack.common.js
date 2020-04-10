const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
}

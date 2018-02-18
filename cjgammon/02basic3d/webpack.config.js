var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js',
  output: {
    filename: 'dest/bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({template: './template.html'})]
}

const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin('bulma.css');

module.exports = {
  entry: './libs/bulma/bulma.sass',
  output: {
    filename: 'bulma.css',
    path: path.resolve(__dirname, 'static/styles')
  },
  plugins: [
    extractCSS,
  ],
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ])
      }
    ]
  }
};
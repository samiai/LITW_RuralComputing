var path = require("path");
var webpack = require("webpack");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// use this to analyze size of individual libraries.
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: path.join(__dirname, "src", "study.js"),
  output: {
    path: path.join(__dirname, "dist"),
    chunkFilename: "[name].min.js",
    filename: "bundle.min.js"
  },
  module: {
    rules: [
      {
        test: /.*\.html$/,
        use: [{
          loader: 'handlebars-loader'
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](jquery|jquery-ui-bundle)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    }
  }
};

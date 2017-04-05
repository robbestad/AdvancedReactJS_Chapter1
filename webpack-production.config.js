const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'source','index'),
  output: {
    filename: "[name]-[hash:8].js",
    path: path.join(__dirname, "public"),
    publicPath: "/",
    chunkFilename: "[name]-[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin(
      [
        {from: "assets", to: ""}
      ],
      {ignore: ["**/*.css"]}, {copyUnmodified: true}
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'BABEL_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: "React Hot Reload template",
      template: "index.hbs",
      version: require(path.join(__dirname, 'package.json')).version,
      inject: true,
      cache: false,
      appMountId: "root",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true
      }
    })
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'source'),
        query: {
          presets: [
            'react',
            'es2015'
          ],
          plugins: [
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

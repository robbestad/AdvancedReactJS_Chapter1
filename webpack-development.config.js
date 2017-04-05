const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    "webpack/hot/only-dev-server",
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
    path.join(__dirname, 'source', 'index')
  ],
  output: {
    filename: "[name]-[hash:8].js",
    path: path.join(__dirname, "build"),
    publicPath: "/",
    chunkFilename: "[name]-[chunkhash].js"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {from: "assets", to: "./"}
      ]
    ),
    new HtmlWebpackPlugin({
      title: "React Hot Reload template",
      template: "index.hbs",
      version: require(path.join(__dirname, 'package.json')).version,
      inject: true,
      cache: false,
      appMountId: "app"
    }),
    new ExtractTextPlugin("style.css"),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'source'),
        query: {
          presets: [
            "react",
            "es2015"
          ],
          plugins: [
            "react-hot-loader/babel",
            [
              "react-transform",
              {
                transforms: [
                  {
                    "transform": "react-transform-hmr",
                    "imports": [
                      "react"
                    ],
                    "locals": [
                      "module"
                    ]
                  },
                  {
                    "transform": "react-transform-catch-errors",
                    "imports": [
                      "react",
                      "redbox-react"
                    ]
                  }
                ]
              }
            ]
          ]
        }
      },
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

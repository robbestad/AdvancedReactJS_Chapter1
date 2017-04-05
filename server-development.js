console.log('DEVELOPMENT SERVER')
const express = require('express')
const path = require('path')
const app = express()
const historyMiddleware = require('connect-history-api-fallback')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const webpack = require('webpack')
const config = require('./webpack-development.config')
const compiler = webpack(config)

app.use(historyMiddleware())
app.use(express.static(path.join(__dirname, 'build', 'assets')))
app.use(hotMiddleware(compiler))
app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  quiet: false,
  noInfo: false,
  stats: {
    colors: true,
    chunks: false,
    chunkModules: false
  },
  hot: true,
  lazy: false,
  historyApiFallback: true,
  headers: { "Access-Control-Allow-Origin": "*" }
}))

app.listen(8080)

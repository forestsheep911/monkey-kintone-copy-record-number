const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { baseOptions, getBanner } = require('./webpack.config.base')
const devBanner = require('./dev.meta.js')

module.exports = () => {
  baseOptions.output.filename = `${devBanner.name}.dev.user.js`
  baseOptions.plugins.push(
    new webpack.BannerPlugin({
      banner: getBanner(devBanner),
      raw: true,
      entryOnly: true,
    }),
    new webpack.DefinePlugin({
      PRODUCTION: false,
      FILENAME: JSON.stringify(`${devBanner.name}.dev.user.js`),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
  )
  baseOptions.devServer = {
    static: [
      {
        directory: path.join(__dirname, '../public'),
      },
      {
        directory: path.join(__dirname, '../dist'),
      },
    ],
    compress: true,
    port: 8080,
    hot: false,
    open: true,
    liveReload: true,
    watchFiles: ['src/**/*', 'public/**/*'],
  }
  baseOptions.mode = 'development'

  return baseOptions
}

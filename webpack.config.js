const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'source-map',
  entry:  __dirname + "/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
},
  plugins: [
    new HtmlWebpackPlugin({
        template: __dirname + "/index.html"
    })
  ],
}
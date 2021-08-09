module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    chunkFilename: '[name].[chunkhash].js',
  },
}

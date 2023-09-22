const path = require('path');

module.exports = {
    target: 'node',
    entry: {
      app: './src/app.ts',
      jurorIdentifier: './src/jurorIdentifier.ts',
      voting: './src/voting.ts',
     }, // Your source entry point
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$|\.jsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  stats: {
    errorDetails: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "stream": require.resolve("stream-browserify"),
        "fs": false,
        "path": require.resolve("path-browserify")
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};

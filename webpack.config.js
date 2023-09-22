const path = require('path');
const webpack = require('webpack')

module.exports = {
    target: 'web',
    entry: {
      groupGenerator: './src/groupGenerator.ts',
      jurorIdentifier: './src/jurorIdentifier.ts',
      caseVoting: './src/caseVoting.ts',
      vote: './src/vote.ts',
     }, // Your source entry point
     plugins:[
        new webpack.DefinePlugin({
            "process.browser": true,
            "process.env": 'DEV',
            "process.env.DEFAULT_NETWORK": process.env.DEFAULT_NETWORK,
            "process.env.INFURA_API_KEY": process.env.INFURA_API_KEY,
            "process.env.ETHEREUM_PRIVATE_KEY": process.env.ETHEREUM_PRIVATE_KEY,
            "process.env.NODE_DEBUG": process.env.NODE_DEBUG,
        }),
     ],
     devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
      },
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
        "crypto-browserify": require.resolve("crypto-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "stream": require.resolve("stream-browserify"),
        "fs": false,
        "crypto": false,
        "path": require.resolve("path-browserify")
    }
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
};

const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'growatt.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    __dirname: false,
    __filename: false
  },
  externals: {
    serialport: 'require("serialport")',
    typeorm:    'require("typeorm")',
  }
};

const path = require('path'),
  webpack = require('webpack'),
  TerserPlugin = require('terser-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

require('./lib/preBuild');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  externals: {
    react: 'react',
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    library: 'EmojiPicker',
    libraryTarget: 'umd',
  },
  resolve: {
    // https://stackoverflow.com/a/56044113
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      '@storybook/react': '@storybook/preact',
      // Not necessary unless you consume a module using `createClass`
      'create-react-class': 'preact/compat/lib/create-react-class',
      // Not necessary unless you consume a module requiring `react-dom-factories`
      'react-dom-factories': 'preact/compat/lib/react-dom-factories',
    },
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        loaders: ['svg-url-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      DEFAULT_EMOJI_URL: JSON.stringify(
        'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64'
      ),
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

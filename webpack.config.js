const path = require('path');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

console.log('>>>>>', __dirname);

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: './client/src/app.jsx',
    output: {
      path: path.join(__dirname, 'client/public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loaders: ['babel-loader?presets[]=react,presets[]=env'],
          test: /\.jsx?$/,
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.scss'),
      new Dotenv({
        systemvars: true
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    node: {
      dns: 'empty',
      net: 'empty'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'client/public'),
      historyApiFallback: true
    }
  };
};

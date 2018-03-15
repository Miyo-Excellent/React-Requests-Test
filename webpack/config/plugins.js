// Dependencies
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

// Environment
const isDevelopment = process.env.NODE_ENV !== 'production';

// Analyzer
const isAnalyzer = process.env.ANALYZER === 'true';

export default type => {
  const plugins = [
    new ExtractTextPlugin({
      filename: '../../public/css/style.css',
      allChunks: true
    })
  ];

  if (type === 'client') {
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: mod => /node_modules/.test(mod.context)
      })
    );
  }

  if (isAnalyzer) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      })
    );
  }

  if (isDevelopment) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
    );
  } else {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true
      })
      // Causes problems with REACT-REDUX. only use for files that do not use REACT-REDUX.
      // new CompressionPlugin({
      //   asset: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.css$|\.html$/,
      //   threshold: 0,
      //   minRatio: 0.8
      // })
    );
  }

  return plugins;
};

  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin')


  const config = require('../config')

  let entry = {},
      plugins = [ 
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin(), 
        new webpack.NoEmitOnErrorsPlugin()];

  //多页面
  ['index','product'].forEach((page) => {
      entry[page] = path.resolve(__dirname, '../src/page/'+page+'/'+page+'.js');
      plugins.push(new HtmlWebpackPlugin({
        favicon: 'static/favicon.ico',
        filename : page+'.html',
        minify : true,
        chunks: [page],
        template: path.resolve(__dirname, '../src/page/'+page+'/'+page+'.ejs')
      }))
  });

  plugins.push(new CopyWebpackPlugin([ {
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
  }]));


  module.exports = {
    mode : 'development',
    entry: entry,
    output: {
      publicPath : '/',
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../dist')
    },
    devtool : 'cheap-module-eval-source-map',
    devServer: {
        publicPath: config.dev.assetsPublicPath,
        host : config.dev.host,
        port: config.dev.port,
        clientLogLevel : 'warning',
        contentBase : path.join(__dirname, "../dist"),
        inline: true,
        hot: true,
        compress: true,
        watchOptions: {
          poll: true
        }
    },
   	module:{
    	rules: [
          {
              test: /\.ejs$/,
              exclude: /node_modules/,
              use: [{
                  loader: 'ejs-loader?variable=data'
              }]
          },
       		{
         		test: /\.css$/,
		        use: ['style-loader','css-loader']
       		},
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
               {
                  loader : 'url-loader',
                  options: { 
                    name : 'img/[name].[hash:8].[ext]',
                    limit: 1024 
                  }
               }
            ]
          }
     	]
   	},
    plugins: plugins
  };

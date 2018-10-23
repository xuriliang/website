  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");

  const config = require('../config')


  let plugins = [],entry = {};

  //提取css
  plugins.push(new MiniCssExtractPlugin({
    filename : 'css/[name].[contenthash].css'
  }));
  //多页面
  ['index','product'].forEach((page) => {
      entry[page] = path.resolve(__dirname, '../src/page/'+page+'/'+page+'.js');
      plugins.push(new HtmlWebpackPlugin({
        favicon: 'static/favicon.ico',
        filename : page+'.html',
        minify : {
          collapseWhitespace : true,
          removeComments : true,
          minifyJS : true,
          minifyCSS : true
        },
        chunks: [page],
        template: path.resolve(__dirname, '../src/page/'+page+'/'+page+'.ejs')
      }))
  });
  //复制静态文件
  plugins.push(new CopyWebpackPlugin([ {
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
  }]));


  module.exports = {
    mode : 'production',
    entry: entry,
    output: {
      publicPath : config.build.assetsPublicPath,
      filename: 'js/[name].[chunkhash].js',
      path: config.build.assetsRoot
    },
   	module: {
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
		        use: [MiniCssExtractPlugin.loader,'css-loader']
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    //minSize : 1,
                    name: 'commons',
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    plugins: plugins
  };

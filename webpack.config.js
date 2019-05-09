
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        contentBase: './build',
        host:'localhost',
        port:'8080',
        open:true//自动拉起浏览器
      },
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js',
    },

    module:{
     rules:[
         {
             test:/\.js?$/,
             exclude:/(node_moudules)/,
             use: {
                loader: 'babel-loader',
                options:{
                cacheDirectory:true//缓存
            }
           }   
         },
         {
             test:/\.css?$/,
             use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:"../"
                    }
                },
                  
               "css-loader","stylus-loader"

              ],
             
            
         },
     
         {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              //outputPath: "image/"
              name: 'image/[name].[ext]',
            },
        },
     ],
   
    },
    plugins:[
        new CleanWebpackPlugin( {
            root:  path.resolve(__dirname, 'build'),
            verbose: true,
            dry: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',// 模板文件          
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'static/[name].css',
            chunkFilename: '[id].css',
          }),
    
     ],
    mode:'development'
}
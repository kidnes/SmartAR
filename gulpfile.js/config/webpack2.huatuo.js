/**
 * @file webpack 的任务配置，包括 webpack 的本地测试和打包上线
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */


var util = require('../lib/util');
var config = require('./');
var webpack = require('webpack');
var WebpackManifest = require('../lib/webpackManifest');

var path = require('path');
var publicPath = '/js/';

module.exports = function (env) {
    var jsDest = config.publicDirectory + 'huatuo/js/';

    var timestamp = util.formatDate(new Date(), 'yyyyMMddhhmm');

    var webpackConfig = {
        context: config.sourceDirectory,
        entry: {
            huatuo: config.sourceDirectory + '/huatuo/index.js'
            // preview: config.sourceDirectory + '/pages/preview/index.js'
        },
        output: {
            path: jsDest,
            publicPath: './js/',
            filename: env === 'production' ? '[name]-' + timestamp + '.js' : '[name].js'
            // filename: env === 'production' ? '[name]-[hash].js' : '[name].js'
        },
        plugins: [],
        resolve: {
            extensions: ['.js', '.vue'],
            modules: [
                config.sourceDirectory, 'node_modules', 'node_modules/mip/src', 'node_modules/mip/deps'
            ],
            alias: {
                // 'vue': 'vue/dist/vue.js',
                zepto: 'jquery',
                util: 'util.js'
            }
            // mainFiles: ['index']
        },
        module: {
            loaders: [
                {test: /\.vue$/, loader: 'vue-loader'},
                // {test: function (filePath) {
                //     let compPath = config.sourceDirectory + '/components/';
                //     if (filePath.indexOf(compPath) === 0 && /index\.vue$/.test(filePath)) {
                //         return true;
                //     }
                //     return false;
                // }, loader: 'leo-vue-loader'},
                {test: /\.js$/, loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        plugins: ['transform-runtime']
                    },
                    exclude: /node_modules/
                },
                {test: /\.styl$/, loader: 'stylus-loader'},
                {test: /\.css$/, loader: 'style-loader!css-loader'},
                {test: /\.json$/, loader: 'json-loader'},
                {test: /\.html$/, loader: 'html-loader'},
                {test: /\.less$/, loader: 'style-loader!css-loader!less-loader', exclude: /node_modules/},
                {test: /\.less.us$/, loader: 'css-loader!less-loader', exclude: /node_modules/},
                {test: /\.(png|jpg|gif|swf|ico)/, loader: 'file-loader?name=[path][name].[ext]'},
                {test: /\.(ttf|woff|woff2|eot|svg)/, loader: 'file-loader?name=[path][name].[ext]'}
            ]
        }
    };

    webpackConfig.plugins.push(new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
    }));

    var conf = env === 'development' ? require('./webpack.dev') : require('./webpack.prod');
    if (env === 'development') {
        webpack.debug = true;

        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            })
        );
    }

    if (env === 'qa') {
        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('qa')
                }
            })
        );
    }

    if (env === 'production') {
        // webpackConfig.devtool = 'sourcemap';
        webpackConfig.plugins.push(
            new WebpackManifest(publicPath, config.distPath + '/' + config.basePath),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            })
        );
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({
        INJECT_ROUTER: JSON.stringify(conf.router)
    }));

    return webpackConfig;
};

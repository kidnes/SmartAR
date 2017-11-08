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

var publicPath = '/js/';

module.exports = function (env) {
    var jsDest = config.publicDirectory + '/js/';

    var timestamp = util.formatDate(new Date(), 'yyyyMMddhhmm');

    var webpackConfig = {
        entry: {
            index: config.sourceDirectory + '/index.js'
        },
        output: {
            path: jsDest,
            publicPath: './js/',
            filename: env === 'production' ? '[name]-' + timestamp + '.js' : '[name].js'
            // filename: env === 'production' ? '[name]-[hash].js' : '[name].js'
        },
        plugins: [],
        resolve: {
            extensions: ['', '.js', '.vue'],
            modules: [
                config.sourceDirectory, 'node_modules'
            ],
            modulesDirectories: [config.sourceDirectory, 'node_modules'],
            alias: {
                zepto: 'jquery'
            }
        },
        module: {
            loaders: [
                {test: /\.vue$/, loader: 'vue-loader'},
                // {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
                {test: /\.css$/, loader: 'style!css'},
                {test: /\.less$/, loader: 'style!css!less', exclude: /node_modules/},
                {test: /\.json$/, loader: 'json-loader'},
                {test: /\.html$/, loader: 'html-loader'},
                {test: /\.(png|jpg|gif|ico)/, loader: 'file-loader?name=[path][name].[ext]'},
                {test: /\.(ttf|woff|woff2|eot|svg)/, loader: 'file-loader?name=[path][name].[ext]'}
                // {test: /\.(png|jpg|gif|ico)/, loader: 'file-loader?name=../assets/img/[name].[ext]'}
            ]
        },
        babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }
    };

    // webpackConfig.plugins.push(new webpack.ProvidePlugin({
    //     '$': 'jquery',
    //     'jQuery': 'jquery',
    //     'window.jQuery': 'jquery'
    // }));

    var conf = env === 'development' ? require('./webpack.dev') : require('./webpack.prod');

    if (env === 'development') {
        webpack.debug = true;
    }

    if (env === 'production') {
        webpackConfig.devtool = 'sourcemap';
        webpackConfig.plugins.push(
            new WebpackManifest(publicPath, config.distPath + '/' + config.basePath),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin()
        );
    }

    webpackConfig.plugins.push(new webpack.DefinePlugin({
        INJECT_ROUTER: JSON.stringify(conf.router)
    }));

    return webpackConfig;
};

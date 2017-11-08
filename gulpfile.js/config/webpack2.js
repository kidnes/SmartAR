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
    var jsDest = config.publicDirectory + '/js/';

    var timestamp = util.formatDate(new Date(), 'yyyyMMddhhmm');
    var webpackConfig = {
        context: config.sourceDirectory,
        entry: {
            index: config.sourceDirectory + '/index.js'
        },
        output: {
            path: jsDest,
            publicPath: '/js/',
            filename: env === 'production' ? '[name]-' + timestamp + '.js' : '[name].js'
        },
        plugins: [],
        resolve: {
            extensions: ['.js', '.vue'],
            modules: [
                config.sourceDirectory, 'node_modules', 'node_modules/mip/src', 'node_modules/mip/deps'
            ],
            alias: {
                // 'vue': 'vue/dist/vue.js',
                util: 'util.js',
                scrolloverflow: path.resolve(__dirname, '../../node_modules/fullpage.js/vendors/scrolloverflow.js')
            }
            // mainFiles: ['index']
        },
        module: {
            rules: [
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
                {test: /\.(png|jpg|gif|ico)/, loader: 'file-loader?name=[path][name].[ext]'},
                {test: /\.(ttf|woff|woff2|eot|svg)/, loader: 'file-loader?name=[path][name].[ext]'}
            ]
        }
    };

    webpackConfig.plugins.push(new webpack.ProvidePlugin({
        'THREE': 'three',
        'window.THREE': 'three',
        'MMDParser': 'three/examples/js/libs/mmdparser.min.js'
    }));

    var conf = env === 'development' ? require('./webpack.dev') : require('./webpack.prod');

    if (env === 'development') {
        webpack.debug = true;
        // webpackConfig.devtool = 'sourcemap';
    }

    if (env === 'production') {
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

/**
 * @file webpack 的任务配置，包括 webpack 的本地测试和打包上线
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */


var webpackConfig = require('./gulpfile.js/config/webpack2')('development');

module.exports = webpackConfig;


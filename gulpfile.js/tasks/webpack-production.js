/**
 * @file webpack 模块化构建正式发布版本任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var args = require('minimist')(process.argv.slice(2));
var configPath = args.name ? '.' + args.name : '';
var config = require('../config/webpack2' + configPath)('production');
var gulp = require('gulp');
var logger = require('../lib/compileLogger');
var webpack = require('webpack');

gulp.task('webpack:production', function (callback) {
    webpack(config, function (err, stats) {
        logger(err, stats);
        callback();
    });
});

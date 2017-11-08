/**
 * @file webpack 模块化构建开发环境任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var args = require('minimist')(process.argv.slice(2));
var configPath = args.name ? '.' + args.name : '';
var config = require('../config/webpack2' + configPath)('development');
var gulp = require('gulp');
var logger = require('../lib/compileLogger');
var webpack = require('webpack');

gulp.task('webpack:development', function (callback) {
    var built = false;

    webpack(config).watch(200, function (err, stats) {
        logger(err, stats);
        // On the initial compile, let gulp know the task is done
        if (!built) {
            built = true;
            callback();
        }
    });
});

/**
 * @file 本地开发监测文件变动任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var gulp     = require('gulp');
var html     = require('../config/html');
var watch    = require('gulp-watch');

gulp.task('watch', function () {
    watch(html.watch, function () {
        gulp.start('html');
    });
});

/**
 * @file 构建之前清除项目
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var gulp = require('gulp');
var del = require('del');
var config = require('../config');

gulp.task('clean', function (cb) {
    del([
        config.publicDirectory
    ], {force: true}, cb);
});

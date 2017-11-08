/**
 * @file gulp 默认执行任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var gulp = require('gulp');

gulp.task('deploy', ['build:production']);

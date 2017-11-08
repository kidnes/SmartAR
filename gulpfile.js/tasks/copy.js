/**
 * @file 拷贝文件任务
 *
 * @author liubin29(liubin29@baidu.com)
 * 2015年10月27日
 */

var config       = require('../config/copy');
var gulp         = require('gulp');
var handleErrors = require('../lib/handleErrors');

gulp.task('copy', function () {
	gulp.src(config.swfSrc).on('error', handleErrors).pipe(gulp.dest(config.swfDest));
    gulp.src(config.assetSrc).on('error', handleErrors).pipe(gulp.dest(config.assetDest));
    gulp.src(config.easyuiSrc).on('error', handleErrors).pipe(gulp.dest(config.easyuiDest));
    gulp.src(config.ueditorSrc).on('error', handleErrors).pipe(gulp.dest(config.ueditorDest));
    return gulp.src(config.ueditorConfigSrc).on('error', handleErrors).pipe(gulp.dest(config.ueditorConfigDest));
});

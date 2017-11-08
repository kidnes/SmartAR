/**
 * @file 处理html文件任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var config       = require('../config/html');
var gulp         = require('gulp');
var handleErrors = require('../lib/handleErrors');

gulp.task('html', function () {
    return gulp.src(config.src)
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest));
});

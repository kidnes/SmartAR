/**
 * @file 项目迁移，兼容旧文件
 *
 * @author liubin29@baidu.com
 * 2015年11月26日
 */

var config       = require('../config/migrate');
var gulp         = require('gulp');
var handleErrors = require('../lib/handleErrors');

gulp.task('migrate', function () {
    return gulp.src(config.src)
        .on('error', handleErrors)
        .pipe(gulp.dest(config.dest));
});

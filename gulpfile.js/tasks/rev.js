/**
 * @file 版本控制
 *
 * @author liubin29@baidu.com
 * 2016年4月17日
 */

var gulp = require('gulp');
var revReplace = require('gulp-rev-replace');
var config = require('../config');

gulp.task('rev', function (cb) {
    var manifest = gulp.src(config.publicDirectory + '/rev-manifest.json');
    return gulp.src(config.publicDirectory + '/**/*.html')
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest(config.publicDirectory));
});

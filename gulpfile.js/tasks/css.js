/**
 * @file css 构建任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var config = require('../config/css');
var gulp   = require('gulp');
var rev    = require('gulp-rev');
// var stylus = require('gulp-stylus');


gulp.task('css', function () {

    return gulp.src(config.src)
        // .pipe(rev())
        // .pipe(minify())
        // .pipe(stylus({
        //     'include css': true
        // }))
        .pipe(gulp.dest(config.dest))
        .pipe(rev.manifest('dist/rev-manifest.json', {merge: true}))
        .pipe(gulp.dest(''));
});

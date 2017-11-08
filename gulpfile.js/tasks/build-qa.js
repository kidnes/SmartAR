/**
 * @file 构建发布版
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:qa', function (cb) {
    process.env.NODE_ENV = 'qa';
    gulpSequence('clean', ['copy', 'html', 'css', 'migrate'], 'webpack:qa', ['rev', 'compress'], cb);
});

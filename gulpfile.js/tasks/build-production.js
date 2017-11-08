/**
 * @file 构建发布版
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task('build:production', function (cb) {
    process.env.NODE_ENV = 'production';
    gulpSequence('clean', ['copy', 'html', 'css', 'migrate'], 'webpack:production', ['rev', 'compress'], cb);
});

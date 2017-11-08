/**
 * @file nightwatch 测试
 *
 * @author liubin29@baidu.com
 * 2016年9月21日
 */

var path = require('path');
var gulp = require('gulp');
var spawn = require('cross-spawn');

gulp.task('test', function (cb) {
    var args = ['--config', path.resolve(__dirname + '/../config/nightwatch.js')];
    args.concat(['--env', 'chrome,phantomjs']);

    spawn('./node_modules/.bin/nightwatch', args, {
        stdio: 'inherit'
    });
});

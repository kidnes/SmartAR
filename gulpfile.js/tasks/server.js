/**
 * @file 本地开发环境启动服务任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var gulp     = require('gulp');

gulp.task('server', ['build:development'], function () {
    require('../app');
});

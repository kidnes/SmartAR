/**
 * @file 本地开发环境启动服务任务
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

var config   = require('./config/server');
var gutil    = require('gulp-util');
// var open     = require('open');
var app      = require('koa')();
var body     = require('koa-bodyparser');
var mock     = require('./lib/mockMiddleware');
var proxy    = require('./lib/proxyMiddleware');
var staticCache = require('koa-static');
var index    = require('./config');
var router      = require('koa-router')();

var url = 'http://localhost:' + config.port + '/' + index.basePath;

app.use(staticCache(config.root, config.staticOptions));

app.use(body());

app.use(router.routes()).use(router.allowedMethods());

app.use(config.mockLocal ? mock.mockLocal : mock.mockRemote);

app.use(proxy);

app.listen(config.port);

gutil.log('production server started on ' + gutil.colors.green(url));

// open(url);

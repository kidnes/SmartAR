/**
 * @file 本地和远程数据模拟模块
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */

let url = require('url');
let gutil = require('gulp-util');
let httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {

    res.end('Something went wrong. And we are reporting a custom error message.');
});

module.exports = function* (next) {
    this.respond = false;
    gutil.log('URL:', this.req.url);

    let location = url.parse(this.req.url);
    proxy.web(this.req, this.res, {
        target: location.protocol + '//' + location.host
    });
};

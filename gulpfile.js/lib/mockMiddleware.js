/**
 * @file 本地和远程数据模拟模块
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */
'use strict';

let fs = require('fs');
let gutil = require('gulp-util');
let _ = require('lodash');
let httpProxy = require('http-proxy');

let config = require('../config/server');
let index = require('../config');

let util = require('./util');

let proxy = httpProxy.createProxyServer({});

let base = config.remote.path;


proxy.on('error', function (err, req, res) {
    gutil.log('error:', res.statusCode);
    res.writeHead(res.statusCode || 500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

exports.mockRemote = function* (next) {
    if (this.req.headers['x-requested-with'] !== 'XMLHttpRequest'
        || /\.html$/g.test(this.req.url)) {
        return yield next;
    }

    // hack技巧，不使用koa的reponse，使用原生的
    this.respond = false;
    gutil.log('URL:', base + this.req.url);

    this.req.headers = _.assign(this.req.headers, config.remote.headers);

    proxy.web(this.req, this.res, {
        target: base
    });

    // yield next;
};

exports.mockLocal = function* (next) {
    if (/\.html$/g.test(this.req.url)) {
        return yield next;
    }

    let path = this.req.url.split('?')[0];
    let reg = /http:\/\/(localhost|127\.0\.0\.1)(:\d+)*(\/.+)/;
    let matchs = path.match(reg);

    if (matchs && matchs.length > 0) {
        path = matchs[3];
    }
    path = path[0] === '/' ? path : '/' + path;
    if (index.basePath && path.indexOf('/' + index.basePath + '/') === 0) {
        path = path.substr(index.basePath.length + 1);
    }
    let base = config.mockRoot + '/mock/' + this.req.method + path;

    if (fs.existsSync(base)) {
        let stat = fs.lstatSync(base);
        if (!stat.isDirectory()) {
            gutil.log('本地模拟数据:', base);
            this.body = fs.readFileSync(base, {encoding: 'utf8'});
        }
        else if (fs.existsSync(base + '/index.json')) {
            gutil.log('本地模拟数据:', base + '/index.json');
            this.body = fs.readFileSync(base + '/index.json', {encoding: 'utf8'});
        }
        else if (fs.existsSync(base + '/index.js')) {
            gutil.log('本地模拟数据:', base + '/index.js');

            let mock = require(base + '/index.js');
            if (typeof mock === 'function') {
                let param = this.req.method.toUpperCase() === 'POST'
                    ? this.request.body : util.parseParam(this.req.url);

                let result = require(base + '/index.js').call(this, param || {}, this.req, this.res);
                if (result.next && typeof result.next === 'function') {
                    this.body = yield require(base + '/index.js').call(this, param || {}, this.req, this.res);
                }
                else {
                    this.body = result;
                }
            }
            else {
                this.body = mock;
            }

            delete require.cache[require.resolve(base + '/index.js')];
        }
        else {
            yield next;
        }
    }
    else {
        yield next;
    }
};


/**
 * @file server 任务配置
 * @desc 注意关键变更配置：
 *       1、mockLocal 是否使用本地模拟数据
 *       2、mockRemote 和 remote 配置是模拟远程数据接口时使用，包括鉴权操作
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */


var config = require('./');

module.exports = {
    root: config.base + config.distPath,
    // root: config.publicDirectory,
    port: process.env.PORT || 8000,
    mockRoot: config.base,
    // 本地模拟数据和远程服务器数据切换
    mockLocal: 1,
    remote: {
        path: 'http://dev.nuomi.com:8033',
        headers: {
            cookie: 'cookie_user_key=xuepeng01'
        }
    },
    logLevel: process.env.NODE_ENV ? 'combined' : 'dev',
    staticOptions: {
        extensions: ['html', 'js'],
        maxAge: '31556926',
        gzip: true
    }
};

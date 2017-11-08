/**
 * @file
 *
 * @author liubin29@baidu.com
 * 2015年10月27日
 */
var webpackConf = require('./webpack')('production');

var karmaConfig = {
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    files: ['../../test/**/*.js'],
    preprocessors: {
        '../../test/**/*.js': ['webpack']
    },
    webpack: webpackConf,
    webpackMiddleware: {
        noInfo: true
    },
    autoWatch: true
};

console.log('process.env.TRAVIS_CI:', process.env.TRAVIS_CI);

module.exports = function (config) {
    config.set(karmaConfig);
};

/**
 * @file webpack 开发环境变量
 *
 * @author liubin29@baidu.com
 * 2016年9月9日
 */

var fs = require('fs');
var config = require('./index');

function getRouter() {
    var router = [];

    var base = config.sourceDirectory + '/demos';
    if (!fs.existsSync(base)) {
        return;
    }
    var dirs = fs.readdirSync(base);
    dirs.forEach(function (item) {
        var dir = base + '/' + item;
        var stats = fs.statSync(dir);
        if (!stats.isDirectory()) {
            return;
        }
        var files = fs.readdirSync(dir);

        files = files.filter(function (file) {
            return /\.vue$/i.test(file);
        }).map(function (file) {
            var path = item + '/' + file.slice(0, -4);
            router.push({
                path: path
                // module: 'demos/' + path
            });
        });
    });

    return router;
}

module.exports = {
    router: getRouter()
};
